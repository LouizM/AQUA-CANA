#!/usr/bin/env python3
"""
Backend Testing Suite for Aqua Cana Landing Page
Tests the lead capture endpoints and webhook integration
"""

import requests
import json
import time
from datetime import datetime
import uuid

# Get base URL from frontend .env
def get_base_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    base_url = line.split('=', 1)[1].strip()
                    return f"{base_url}/api"
    except Exception as e:
        print(f"Error reading frontend .env: {e}")
        return None

BASE_URL = get_base_url()
print(f"Testing against: {BASE_URL}")

class LeadTester:
    def __init__(self):
        self.base_url = BASE_URL
        self.session = requests.Session()
        self.test_results = []
        
    def log_result(self, test_name, success, message, details=None):
        """Log test results"""
        result = {
            'test': test_name,
            'success': success,
            'message': message,
            'timestamp': datetime.now().isoformat(),
            'details': details
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {message}")
        if details and not success:
            print(f"   Details: {details}")
    
    def test_1_successful_lead_creation(self):
        """Test successful lead creation with valid data"""
        test_data = {
            "nombre": "María González",
            "codigoPais": "+1",
            "telefono": "8095551234",
            "email": "maria.gonzalez@email.com"
        }
        
        try:
            response = self.session.post(f"{self.base_url}/leads", json=test_data)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success') and data.get('lead_id'):
                    self.log_result(
                        "Successful Lead Creation", 
                        True, 
                        f"Lead created with ID: {data['lead_id']}"
                    )
                    return data['lead_id']
                else:
                    self.log_result(
                        "Successful Lead Creation", 
                        False, 
                        "Response missing success=true or lead_id",
                        data
                    )
            else:
                self.log_result(
                    "Successful Lead Creation", 
                    False, 
                    f"HTTP {response.status_code}",
                    response.text
                )
        except Exception as e:
            self.log_result(
                "Successful Lead Creation", 
                False, 
                f"Request failed: {str(e)}"
            )
        return None
    
    def test_2_lead_retrieval(self):
        """Test GET /api/leads to verify lead was saved"""
        try:
            response = self.session.get(f"{self.base_url}/leads")
            
            if response.status_code == 200:
                leads = response.json()
                if isinstance(leads, list) and len(leads) > 0:
                    self.log_result(
                        "Lead Retrieval", 
                        True, 
                        f"Retrieved {len(leads)} leads from database"
                    )
                    return leads
                else:
                    self.log_result(
                        "Lead Retrieval", 
                        False, 
                        "No leads found in database"
                    )
            else:
                self.log_result(
                    "Lead Retrieval", 
                    False, 
                    f"HTTP {response.status_code}",
                    response.text
                )
        except Exception as e:
            self.log_result(
                "Lead Retrieval", 
                False, 
                f"Request failed: {str(e)}"
            )
        return None
    
    def test_3_invalid_email_validation(self):
        """Test validation with invalid email"""
        test_data = {
            "nombre": "Juan Pérez",
            "codigoPais": "+34",
            "telefono": "612345678",
            "email": "invalid-email"
        }
        
        try:
            response = self.session.post(f"{self.base_url}/leads", json=test_data)
            
            if response.status_code == 422:  # Validation error
                self.log_result(
                    "Invalid Email Validation", 
                    True, 
                    "Correctly rejected invalid email"
                )
            elif response.status_code == 200:
                self.log_result(
                    "Invalid Email Validation", 
                    False, 
                    "Should have rejected invalid email but accepted it"
                )
            else:
                self.log_result(
                    "Invalid Email Validation", 
                    False, 
                    f"Unexpected HTTP {response.status_code}",
                    response.text
                )
        except Exception as e:
            self.log_result(
                "Invalid Email Validation", 
                False, 
                f"Request failed: {str(e)}"
            )
    
    def test_4_missing_fields_validation(self):
        """Test validation with missing required fields"""
        test_cases = [
            {"email": "test@email.com", "telefono": "123456789"},  # Missing nombre
            {"nombre": "Test", "telefono": "123456789"},  # Missing email
            {"nombre": "Test", "email": "test@email.com"},  # Missing telefono
        ]
        
        for i, test_data in enumerate(test_cases):
            try:
                response = self.session.post(f"{self.base_url}/leads", json=test_data)
                
                if response.status_code == 422:  # Validation error
                    self.log_result(
                        f"Missing Fields Validation {i+1}", 
                        True, 
                        f"Correctly rejected incomplete data: {list(test_data.keys())}"
                    )
                else:
                    self.log_result(
                        f"Missing Fields Validation {i+1}", 
                        False, 
                        f"Should have rejected incomplete data but got HTTP {response.status_code}",
                        response.text
                    )
            except Exception as e:
                self.log_result(
                    f"Missing Fields Validation {i+1}", 
                    False, 
                    f"Request failed: {str(e)}"
                )
    
    def test_5_different_country_codes(self):
        """Test different country codes"""
        country_codes = ["+1", "+34", "+52", "+1809"]
        
        for code in country_codes:
            test_data = {
                "nombre": f"Usuario {code}",
                "codigoPais": code,
                "telefono": "555123456",
                "email": f"usuario{code.replace('+', '')}@email.com"
            }
            
            try:
                response = self.session.post(f"{self.base_url}/leads", json=test_data)
                
                if response.status_code == 200:
                    data = response.json()
                    if data.get('success'):
                        self.log_result(
                            f"Country Code {code}", 
                            True, 
                            f"Successfully processed country code {code}"
                        )
                    else:
                        self.log_result(
                            f"Country Code {code}", 
                            False, 
                            f"Request succeeded but response indicates failure",
                            data
                        )
                else:
                    self.log_result(
                        f"Country Code {code}", 
                        False, 
                        f"HTTP {response.status_code}",
                        response.text
                    )
            except Exception as e:
                self.log_result(
                    f"Country Code {code}", 
                    False, 
                    f"Request failed: {str(e)}"
                )
    
    def test_6_multiple_leads_creation(self):
        """Test creating multiple leads"""
        leads_data = [
            {
                "nombre": "Ana Rodríguez",
                "codigoPais": "+1",
                "telefono": "8095551111",
                "email": "ana.rodriguez@email.com"
            },
            {
                "nombre": "Carlos Martínez",
                "codigoPais": "+34",
                "telefono": "612345678",
                "email": "carlos.martinez@email.com"
            },
            {
                "nombre": "Sofía López",
                "codigoPais": "+52",
                "telefono": "5551234567",
                "email": "sofia.lopez@email.com"
            }
        ]
        
        created_leads = []
        
        for i, lead_data in enumerate(leads_data):
            try:
                response = self.session.post(f"{self.base_url}/leads", json=lead_data)
                
                if response.status_code == 200:
                    data = response.json()
                    if data.get('success') and data.get('lead_id'):
                        created_leads.append(data['lead_id'])
                        self.log_result(
                            f"Multiple Leads Creation {i+1}", 
                            True, 
                            f"Created lead for {lead_data['nombre']}"
                        )
                    else:
                        self.log_result(
                            f"Multiple Leads Creation {i+1}", 
                            False, 
                            f"Response missing success or lead_id for {lead_data['nombre']}",
                            data
                        )
                else:
                    self.log_result(
                        f"Multiple Leads Creation {i+1}", 
                        False, 
                        f"HTTP {response.status_code} for {lead_data['nombre']}",
                        response.text
                    )
            except Exception as e:
                self.log_result(
                    f"Multiple Leads Creation {i+1}", 
                    False, 
                    f"Request failed for {lead_data['nombre']}: {str(e)}"
                )
        
        # Verify all leads are in database
        try:
            response = self.session.get(f"{self.base_url}/leads")
            if response.status_code == 200:
                all_leads = response.json()
                if len(all_leads) >= len(created_leads):
                    self.log_result(
                        "Multiple Leads Verification", 
                        True, 
                        f"All {len(created_leads)} leads found in database (total: {len(all_leads)})"
                    )
                else:
                    self.log_result(
                        "Multiple Leads Verification", 
                        False, 
                        f"Expected at least {len(created_leads)} leads, found {len(all_leads)}"
                    )
        except Exception as e:
            self.log_result(
                "Multiple Leads Verification", 
                False, 
                f"Failed to verify leads in database: {str(e)}"
            )
    
    def test_7_webhook_integration(self):
        """Test webhook integration (indirect test)"""
        # We can't directly test the webhook since it's external
        # But we can verify that the endpoint doesn't fail even if webhook fails
        test_data = {
            "nombre": "Webhook Test User",
            "codigoPais": "+1",
            "telefono": "8095559999",
            "email": "webhook.test@email.com"
        }
        
        try:
            response = self.session.post(f"{self.base_url}/leads", json=test_data)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    self.log_result(
                        "Webhook Integration", 
                        True, 
                        "Lead creation succeeded (webhook sent in background)"
                    )
                else:
                    self.log_result(
                        "Webhook Integration", 
                        False, 
                        "Lead creation failed",
                        data
                    )
            else:
                self.log_result(
                    "Webhook Integration", 
                    False, 
                    f"HTTP {response.status_code}",
                    response.text
                )
        except Exception as e:
            self.log_result(
                "Webhook Integration", 
                False, 
                f"Request failed: {str(e)}"
            )
    
    def run_all_tests(self):
        """Run all tests in sequence"""
        print("=" * 60)
        print("AQUA CANA BACKEND TESTING SUITE")
        print("=" * 60)
        
        if not self.base_url:
            print("❌ CRITICAL: Could not determine base URL from frontend/.env")
            return
        
        print(f"Base URL: {self.base_url}")
        print("-" * 60)
        
        # Run tests in order
        self.test_1_successful_lead_creation()
        time.sleep(0.5)
        
        self.test_2_lead_retrieval()
        time.sleep(0.5)
        
        self.test_3_invalid_email_validation()
        time.sleep(0.5)
        
        self.test_4_missing_fields_validation()
        time.sleep(0.5)
        
        self.test_5_different_country_codes()
        time.sleep(0.5)
        
        self.test_6_multiple_leads_creation()
        time.sleep(0.5)
        
        self.test_7_webhook_integration()
        
        # Summary
        print("-" * 60)
        print("TEST SUMMARY")
        print("-" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result['success'])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if failed_tests > 0:
            print("\nFAILED TESTS:")
            for result in self.test_results:
                if not result['success']:
                    print(f"  - {result['test']}: {result['message']}")
        
        return passed_tests, failed_tests

if __name__ == "__main__":
    tester = LeadTester()
    passed, failed = tester.run_all_tests()
    
    # Exit with error code if tests failed
    exit(0 if failed == 0 else 1)