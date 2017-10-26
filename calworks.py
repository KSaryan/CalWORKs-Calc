REGION_1 = ["Alameda", "Contra Costa", "Los Angeles", "Marin", "Monterey", "Napa", "Orange",
"San Diego", "San Francisco", "San Luis Obispo", "San Mateo", "Santa Barbara", "Santa Clara",
"Santa Cruz", "Solano", "Sonoma", "Ventura"]

REGION_1_MBSAC = {1: 660, 2: 1082, 3: 1342, 4: 1592, 5: 1817, 6: 2044, 7: 2246, 8: 2444, 9: 2652, 10: 2878}
REGION_1_MAP = {1: 355, 2: 577, 3: 714, 4: 852, 5: 968, 6: 1087, 7: 1195, 8: 1301, 9: 1407, 10: 1511}
REGION_2_MBSAC = {1: 626, 2: 1029, 3: 1247, 4: 1514 , 5: 1730, 6: 1944, 7: 2131, 8: 2327,  9: 2514, 10: 2738}
REGION_2_MAP = {1: 336, 2: 549, 3: 680, 4: 810 , 5: 922, 6: 1035, 7: 1136, 8: 1239,  9: 1340, 10: 1438}

def net_income_test(total_income, fam_members, emp_fam_members, city_of_res):
	""" Returns whether a family passes net income test 

	>>> net_income_test(1000, 4, 2, "San Francisco")
	True
	>>> net_income_test(2000, 4, 2, "San Francisco")
	False
	>>> net_income_test(1500, 3, 1, "San Francisco")
	False
	>>> net_income_test(1000, 4, 2, "Long Beach")
	True
	>>> net_income_test(1500, 3, 2, "Long Beach")
	False
	>>> net_income_test(1000, 1, 1, "Long Beach")
	False

	"""

	income = total_income - (90 * emp_fam_members)

	if city_of_res in REGION_1:
		return income < REGION_1_MBSAC[fam_members] 
	else:
		return income < REGION_2_MBSAC[fam_members]

# nonexempt: "unearned" income that is not disability-based (ie unemployment income or child/spousal support for C,E).  
family = {1:{'income': 100, 'dis_based_unearned': 10, 'nonexempt_income': None, 'ABCDE': 'A', 'child/spousal_support': 10}, 
		  2:{'income': 100, 'dis_based_unearned': 10, 'nonexempt_income': None, 'ABCDE': 'B', 'child/spousal_support': None},
		  3:{'income': 100, 'dis_based_unearned': None, 'nonexempt_income': 10, 'ABCDE': 'C', 'child/spousal_support': None},
		  4: {'income': 100, 'dis_based_unearned': 10, 'nonexempt_income': None, 'ABCDE': None , 'child/spousal_support': None}}
		  

def family_calc(family, factor, income_type):
	"""calculates total of certain kinds of income for family memebers who fit a certain factor

	>>> family_calc(family, 'dis_based_unearned', 'dis_based_unearned')
	30

	>>> family_calc(family, 'ABCDE', 'income')
	300

	"""
	total = 0
	for member in family:
		if family[member][factor]:
			total += family[member][income_type]
	return total

# def pass_section_a(family):
# 	""" Returns whether a family passes section A of CalWORKS Budget Worksheet


# 	"""

# 	line_1 = family_calc(family, 'dis_based_unearned', 'dis_based_unearned')
# 	# for member in family:
# 	# 	if member['dis_based_unearned']:
# 	# 		line1 += member['dis_based_unearned']
# 	line_3 = line_1 - 225
# 	line_4 = family_calc( family, 'ABCDE', 'income')
# 	# for member in family:
# 	# 	if member['ABCDE']:
# 	# 		line_4 += member['income']
# 	line_6 = line_4 - line_3
# 	# line_7 = line_6 / 2
# 	# line_8 = line_6 - line_7
# 	line_8  = line_6 / 2
# 	line_9 = line_3 if line_3 > 0 else 0
# 	line_10 = family_calc('nonexempt_income', 'nonexempt_income')
# 	line_11 = line_8 + line_9 + line_10
# 	line_12 = 0
# 	for member in family:
# 		if member['ABCDE'] in ['A', 'B'] and member['child/spousal_support']:
# 			line_12 += member['child/spousal_support']
# 	Line_13 = "waiting on Daniel"
# 	line_14 = line_12 - line_13
# 	line_15 = line_14 + line_11
# 	line_16 = ???
# 	if line_15 < line_16:
# 		return min[line_11, line_15]
# 	else: 
# 		return  False


def calc_members_in_categories(family, categories):
	"""Takes list of categories, and returns number of family members in those categories

	>>> calc_members_in_categories(family, ["A", "B"])
	2

	>>> calc_members_in_categories(family, ["A"])
	1

	>>> calc_members_in_categories(family, ["E"])
	0

	"""

	members = 0
	for member in family:
		if family[member]['ABCDE'] in categories:
			members += 1
	return members


	if city in REGION_1:
		return REGION_1_MAP[AC_member]
	else:
		return REGION_2_MAP[AC_member]


def calc_MAP (fam_members, city):
	"""returns MAP (max aid payment) based on fam_members and city
	>>> calc_MAP (2, "Long Beach")
	549

	>>> calc_MAP (2, "San Francisco")
	577

	>>> calc_MAP (4, "Alameda")
	852

	>>> calc_MAP (1, "Long Beach")
	336

	"""

	if city in REGION_1:
		return REGION_1_MAP[fam_members]
	else:
		return REGION_2_MAP[fam_members]



def grant_computation (family, city, line_18_a):
	"""computes total grant for family

	must pass family, city, and results of pass_section_a


	only to be used if for not False for pass_section_a


	>>> grant_computation(family, "Alameda", 52.5)
	355


	>>> grant_computation(family, "Sunland", 52.5)
	336

	"""
	AC_members = calc_members_in_categories(family, ['A', 'C'])

	line_18 = calc_MAP(AC_members, city)

	line_18_c = line_18 - line_18_a

	A_members = calc_members_in_categories(family, ['A'])
	
	line_19 = calc_MAP(A_members, city)
	


	return min([line_19, line_18_c])









if __name__ == "__main__":
    import doctest
    doctest.testmod()