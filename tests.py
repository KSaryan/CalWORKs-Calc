from unittest import TestCase
from app import app
from calworks import *
import doctest
import calworks
import app as server


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
   


if __name__ == "__main__":
    import unittest

    unittest.main()