from unittest import TestCase
from app import app
from calworks import *
import doctest
import calworks
import app as server
from selenium import webdriver


def load_tests(loader, tests, ignore):
    """Also run our doctests and file-based doctests."""

    tests.addTests(doctest.DocTestSuite(calworks))
    return tests


class MyAppUnitTestRoutes(TestCase):
    """class for testing routes"""

    def setUp(self):
        """Do at beginning of every test"""

        self.client =app.test_client()
        app.config["TESTING"] = True
        

    def test_gross_income_test_get(self):
        """tests passed_gross_income_test route as get method"""

        result = self.client.get('/passed_gross_income_test')
        expected_text = "The family has passed the gross income test"
        self.assertIn(expected_text, result.data)

        result = self.client.get('/passed_gross_income_test')
        expected_text = "Choose a County"
        self.assertIn(expected_text, result.data)


    def test_gross_income_test_post(self):
        """tests passed_gross_income_test route"""

        result = self.client.post('/passed_gross_income_test', 
                                 data={'income': 1000, 
                                        'fammembers': 4, 
                                        'empmembers':2,
                                        'county': 'Alameda'
                                        },
                                 follow_redirects=True)
        expected_text = "The family has passed the gross income test"
        self.assertIn(expected_text, result.data)
        self.assertNotIn("Choose a County", result.data)


    def test_gross_income_test_post_bad_input(self):
        """tests passed_gross_income_test route when bad inputs"""

        result = self.client.post('/passed_gross_income_test', 
                                 data={'income':'e', 
                                        'fammembers': 4, 
                                        'empmembers':2,
                                        'county': 'Alameda'
                                        },
                                 follow_redirects=True)
        expected_text = "You have not correctly filled out this form. Please try again."
        self.assertIn(expected_text, result.data)


    def test_gross_income_test_post_missing_input(self):
        """tests passed_gross_income_test route when missing information"""

        result = self.client.post('/passed_gross_income_test', 
                                 data={'income': 100, 
                                        'fammembers': 0, 
                                        'empmembers':2,
                                        'county': 'Alameda'
                                        },
                                 follow_redirects=True)
        expected_text = "You have not correctly filled out this form. Please try again."
        self.assertIn(expected_text, result.data)

        result = self.client.post('/passed_gross_income_test', 
                                 data={'income': 100, 
                                        'fammembers': 4, 
                                        'empmembers':2,
                                        'county': 'other'
                                        },
                                 follow_redirects=True)
        expected_text = "You have not correctly filled out this form. Please try again."
        self.assertIn(expected_text, result.data)


    def test_gross_income_test_post_fail(self):
        """tests passed_gross_income_test route when family fails gross income test"""


        result = self.client.post('/passed_gross_income_test', 
                                 data={'income': 10000, 
                                        'fammembers': 4, 
                                        'empmembers':2,
                                        'county': 'Alameda'
                                        },
                                 follow_redirects=True)
        expected_text = "This family does not qualify for a CalWORKS aid payment because their income is too high."
        self.assertIn(expected_text, result.data)


    def test_error(self):
        """tests error route"""

        result = self.client.get('/error')
        expected_text = "You have not correctly filled out this form. Please try again."
        self.assertIn(expected_text, result.data)


    def test_sorry(self):
        """tests sorry route"""

        result = self.client.get('/sorry')
        expected_text = "This family does not qualify for a CalWORKS aid payment because their income is too high."
        self.assertIn(expected_text, result.data)


    def test_homepage(self):
        """tests homepage route"""

        result = self.client.get('/')
        expected_text = "Welcome to the CalWorks Calculator. This site was designed to make it easier to calculate the CalWorks grant for a family."
        self.assertIn(expected_text, result.data)


    def test_intake_form(self):
        """tests intake_form route"""

        result = self.client.get('/intake_form')
        expected_text = "This information will be used to calculate whether the family passes the gross income test and possibly qualifies for a grant."
        self.assertIn(expected_text, result.data)


    def test_calc_grant_pass(self):
        """test calc_grant route"""

        family = """{1:{'income': 100, 'dis_based_unearned': 10, 'nonexempt_income': None, 'ABCDE': 'A', 'child/spousal_support': 10}, 
                  2:{'income': 100, 'dis_based_unearned': 10, 'nonexempt_income': None, 'ABCDE': 'B', 'child/spousal_support': None},
                  3:{'income': 100, 'dis_based_unearned': None, 'nonexempt_income': 10, 'ABCDE': 'C', 'child/spousal_support': None},
                  4:{'income': 100, 'dis_based_unearned': 10, 'nonexempt_income': None, 'ABCDE': 'E' , 'child/spousal_support': None}
                  }""" 
        result = self.client.post('/calc_grant', 
                                  data={'family': family, 
                                        'county': 'San Francisco'
                                        },
                                  follow_redirects=True)
        expected_text = "The family's estimated grant is"
        self.assertIn(expected_text, result.data)


    def test_calc_grant_fail(self):
        """test calc_grant route"""

        family2 = "{1:{'income': 1000, 'dis_based_unearned': 10, 'nonexempt_income': None, 'ABCDE': 'A', 'child/spousal_support': 10}}"

        result = self.client.post('/calc_grant', 
                                  data={'family': family2, 
                                        'county': 'San Francisco'
                                        },
                                  follow_redirects=True)
        expected_text = "This family does not qualify for a CalWORKS aid payment because their income is too high."
        self.assertIn(expected_text, result.data)
   
class SeleniumTests(TestCase):

    def setUp(self):
        self.browser = webdriver.Firefox()


    def tearDown(self):
        self.browser.quit()


    def test_intake_form(self):
        """tests in infro from intake form shows up in modal"""

        self.browser.get('http://localhost:5000/intake_form')

        fam = self.browser.find_element_by_id('fammembers')
        fam.send_keys("4")

        emp = self.browser.find_element_by_id('empmembers')
        emp.send_keys("2")

        income = self.browser.find_element_by_id('income')
        income.send_keys("1000")

        self.browser.find_element_by_xpath("//select[@name='county']/option[text()='San Francisco']").click()


        btn = self.browser.find_element_by_id('submithome')
        btn.click()

        result = self.browser.find_element_by_class_name('fammembersinfo')
        self.assertEqual(result.text, "4")

        result = self.browser.find_element_by_class_name('empmembersinfo')
        self.assertEqual(result.text, "2")
        
        result = self.browser.find_element_by_class_name('incomeinfo')
        self.assertEqual(result.text, "$1,000.00")

        result = self.browser.find_element_by_class_name('countyinfo')
        self.assertEqual(result.text, "San-Francisco")


    def test_intake_form_county_no_dash(self):
        """tests if county showing up correctly in modal"""

        self.browser.get('http://localhost:5000/intake_form')

        self.browser.find_element_by_xpath("//select[@name='county']/option[text()='San Francisco']").click()


        btn = self.browser.find_element_by_id('submithome')
        btn.click()

        result = self.browser.find_element_by_class_name('countyinfo')
        self.assertEqual(result.text, "San-Francisco")


    def test_intake_form_empty_fields(self):
        """tests what happens if leave forms blank"""

        self.browser.get('http://localhost:5000/intake_form')

        fam = self.browser.find_element_by_id('fammembers')
        fam.send_keys("")

        emp = self.browser.find_element_by_id('empmembers')
        emp.send_keys("")

        income = self.browser.find_element_by_id('income')
        income.send_keys("")

        btn = self.browser.find_element_by_id('submithome')
        btn.click()

        result = self.browser.find_element_by_class_name('fammembersinfo')
        self.assertEqual(result.text, "0")

        result = self.browser.find_element_by_class_name('empmembersinfo')
        self.assertEqual(result.text, "0")
        
        result = self.browser.find_element_by_class_name('incomeinfo')
        self.assertEqual(result.text, "$0.00")

        result = self.browser.find_element_by_class_name('countyinfo')
        self.assertEqual(result.text, "other")


    def test_fam_form_number_of_fam_dropdown(self):
        """tests if fam-mems-select dropdown properly changes the number of forms displayed"""

        self.browser.get('http://localhost:5000/passed_gross_income_test')

        self.browser.find_element_by_xpath("//select[@name='fam-mems-select']/option[text()='4']").click()

        result = self.browser.find_element_by_id("fam-mems")
        self.assertIn("Family Member 4", result.text)

        self.browser.find_element_by_xpath("//select[@name='fam-mems-select']/option[text()='2']").click()

        result = self.browser.find_element_by_id("fam-mems")
        self.assertIn("Family Member 2", result.text)

        result = self.browser.find_element_by_id("fam-mems")
        self.assertNotIn("Family Member 4", result.text)

        # testting if modal also properly updated
        self.browser.find_element_by_xpath("//select[@name='county']/option[text()='Napa']").click()
        btn = self.browser.find_element_by_id('calc-btn')
        btn.click()

        result = self.browser.find_element_by_id('fam-modal')
        self.assertIn("2", result.text)
        self.assertNotIn("4", result.text)


    def test_skip_intake_form(self):
        """tests if clicking skip link allows skip intake form"""

        self.browser.get('http://localhost:5000/intake_form')

        link = self.browser.find_element_by_id('skip')
        link.click()

        result = self.browser.find_element_by_class_name('fake-legend')
        self.assertIn('Individual Family Member Info', result.text)


    def test_self_emp_modal(self):
        """tests self-employment modal functionality"""

        self.browser.get('http://localhost:5000/passed_gross_income_test')
  
        # open modal
        tooltip = self.browser.find_element_by_class_name('selfemptip')
        tooltip.click()
        earnings = self.browser.find_element_by_id('earnings-self-emp')
        earnings.send_keys("400")
        # click actual
        self.browser.find_element_by_id('actual').click();
        # value of expenses when choose actual should be empty
        result = self.browser.find_element_by_id("expense-input")
        val = result.get_attribute('value')
        self.assertEqual("", val)

        # see if expenses autofilled with forty chosen
        self.browser.find_element_by_id('forty').click();
        result = self.browser.find_element_by_id("expense-input")
        val = result.get_attribute('value')
        self.assertEqual("160", val)

        # click calculate button
        btn = self.browser.find_element_by_id('self-emp-btn')
        btn.click()
        # see if result displayed in div
        result = self.browser.find_element_by_id('displayIncome')
        self.assertIn('Add $240.00 to your monthly income', result.text)



if __name__ == "__main__":
    import unittest

    unittest.main()