import json
import os


#questions
questions_dict = {'vb':[# Venn to the Bit Stream (complete)
                        ['What is the Bit Stream for section a?','100',"fig_venn3",'abc'],
                        ['What is the Bit Stream for section b?','010',"""fig_venn3""",'abc'],
                        ['What is the Bit Stream for section c?','001',"fig_venn3",'abc'],
                        ['What is the Bit Stream for section d?','110',"fig_venn3",'abc'],
                        ['What is the Bit Stream for section e?','101',"fig_venn3",'abc'],
                        ['What is the Bit Stream for section f?','011',"fig_venn3",'abc'],
                        ['What is the Bit Stream for section g?','111',"fig_venn3",'abc'],
                        ['What is the Bit Stream for section h?','000',"fig_venn3",'abc']
                          ],

                    'vd':[# Venn to the Disjunctive Normal Form (complete)
                        ['What is the Disjunctive Normal Form of section a?','An_Bn_C',"fig_venn3",'abc'],
                        ['What is the Disjunctive Normal Form of section b?','_AnBn_C',"fig_venn3",'abc'],
                        ['What is the Disjunctive Normal Form of section c?','_An_BnC',"fig_venn3",'abc'],
                        ['What is the Disjunctive Normal Form of section d?','AnBn_C',"fig_venn3",'abc'],
                        ['What is the Disjunctive Normal Form of section e?','An_BnC',"fig_venn3",'abc'],
                        ['What is the Disjunctive Normal Form of section f?','_AnBnC',"fig_venn3",'abc'],
                        ['What is the Disjunctive Normal Form of section g?','AnBnC',"fig_venn3",'abc'],
                        ['What is the Disjunctive Normal Form of section h?','_An_Bn_C',"fig_venn3",'abc']
                          ],

                    'bd':[# Venn & Bit Stream to Disjunctive Normal Form (complete)
                        ['What is the Disjunctive Normal Form of 100?','An_Bn_C',"fig_venn3",'bit'],
                        ['What is the Disjunctive Normal Form of 010?','_AnBn_C',"fig_venn3",'bit'],
                        ['What is the Disjunctive Normal Form of 001?','_An_BnC',"fig_venn3",'bit'],
                        ['What is the Disjunctive Normal Form of 110?','AnBn_C',"fig_venn3",'bit'],
                        ['What is the Disjunctive Normal Form of 101?','An_BnC',"fig_venn3",'bit'],
                        ['What is the Disjunctive Normal Form of 011?','_AnBnC',"fig_venn3",'bit'],
                        ['What is the Disjunctive Normal Form of 111?','AnBnC',"fig_venn3",'bit'],
                        ['What is the Disjunctive Normal Form of 000?','_An_Bn_C',"fig_venn3",'dnf']
                        ],

                    'db':[# Venn & DNF to Bit Stream (complete)
                        ['What is the Bit Stream  Form of An_Bn_C?','100',"fig_venn3",'dnf'],
                        ['What is the Bit Stream Form of _AnBn_C?','010',"fig_venn3",'dnf'],
                        ['What is the Bit Stream Form of _An_BnC?','001',"fig_venn3",'dnf'],
                        ['What is the Bit Stream Form of AnBn_C?','110',"fig_venn3",'dnf'],
                        ['What is the Bit Stream Form of An_BnC?','101',"fig_venn3",'dnf'],
                        ['What is the Bit Stream Form of _AnBnC?','011',"fig_venn3",'dnf'],
                        ['What is the Bit Stream Form of AnBnC?','111',"fig_venn3",'dnf'],
                        ['What is the Bit Stream Form of _An_Bn_C?','000',"fig_venn3",'dnf']
                        ],

                    'so':[# Words to Set Operators
                        ['How do you denote the union of A and B?','AuB',"fig_venn3",'num'],
                        ['How do you denote B union C?','BuC',"fig_venn3",'num'],
                        ['How do you deote the intersection of A and C?','AnC',"fig_venn3",'num'],
                        ['How do you denote A intersect C?','AnC',"fig_venn3",'num'],
                        ['How do you denote the compliment of A?','_A',"fig_venn3",'num']
                        ],

                    'rn':[# Venn & Set Notation to Roster Notation
                        ['What is the roster notation for AuB?','{2,3,4,5,6,7}',"fig_venn3",'num'],
                        ['What is the roster notation for AuC?','{2,3,4,5,6,8}',"fig_venn3",'num'],
                        ['What is the roster notation for BuC?','{2,3,4,5,7,8}',"fig_venn3",'num'],
                        ['What is the roster notation for AnB?','{2,5}',"fig_venn3",'num'],
                        ['What is the roster notation for AnC?','{2,3}',"fig_venn3",'num'],
                        ['What is the roster notation for BnC?','{2,4}',"fig_venn3",'num'],
                        ['What is the roster notation for _A?','{4,7,8,9}',"fig_venn3",'num'],
                        ['What is the roster notation for _B?','{3,6,8,9}',"fig_venn3",'num'],
                        ['What is the roster notation for _C?','{5,6,7,9}',"fig_venn3",'num'],
                        ['What is the roster notation for Au_B?','{2,3,5,6,8,9}',"fig_venn3",'num'],
                        ['What is the roster notation for Au_C?','{2,3,5,6,7,9}',"fig_venn3",'num'],
                        ['What is the roster notation for Bu_C?','{2,4,5,6,7,9}',"fig_venn3",'num'],
                        ['What is the roster notation for _AuB?','{2,4,5,7,8,9}',"fig_venn3",'num'],
                        ['What is the roster notation for _Au_B?','{3,4,6,7,8,9}',"fig_venn3",'num'],
                        ['What is the roster notation for _AuC?','{2,3,4,7,8,9}',"fig_venn3",'num'],
                        ['What is the roster notation for _Au_C?','{4,5,6,7,8,9}',"fig_venn3",'num'],
                        ['What is the roster notation for _BuC?','{2,3,4,6,8,9}',"fig_venn3",'num'],
                        ['What is the roster notation for An_B?','{3,6}',"fig_venn3",'num'],
                        ['What is the roster notation for An_C?','{5,6}',"fig_venn3",'num'],
                        ['What is the roster notation for Bn_C?','{5,7}',"fig_venn3",'num'],
                        ['What is the roster notation for _AnB?','{4,7}',"fig_venn3",'num'],
                        ['What is the roster notation for _An_B?','{8,9}',"fig_venn3",'num'],
                        ['What is the roster notation for _AnC?','{4,8}',"fig_venn3",'num'],
                        ['What is the roster notation for _An_C?','{7,9}',"fig_venn3",'num'],
                        ['What is the roster notation for _BnC?','{3,8}',"fig_venn3",'num'],

                        # Venn & DNF to Roster Notation
                        ['What is the roster notation for _An_Bn_C?','{0,16,17}',"fig_venn3",'mult'],
                        ['What is the roster notation for _An_BnC?','{15}',"fig_venn3",'mult'],
                        ['What is the roster notation for _AnBn_C?','{10,14}',"fig_venn3",'mult'],
                        ['What is the roster notation for _AnBnC?','{12}',"fig_venn3",'mult'],
                        ['What is the roster notation for An_Bn_C?','{1,5,7}',"fig_venn3",'mult'],
                        ['What is the roster notation for An_BnC?','{3,9}',"fig_venn3",'mult'],
                        ['What is the roster notation for AnBn_C?','{2,4,8}',"fig_venn3",'mult'],
                        ['What is the roster notation for AnBnC?','{6}',"fig_venn3",'mult'],
                        ['What is the roster notation for _Au_Bu_C?','{0,1,2,3,4,5,7,8,9,10,12,14,15,16,17}',"fig_venn3",'mult'],
                        ['What is the roster notation for _Au_BuC?','{0,1,3,5,6,7,9,10,12,14,15,16,17}',"fig_venn3",'mult'],
                        ['What is the roster notation for _AuBu_C?','{0,1,2,4,5,6,7,8,10,12,14,15,16,17}',"fig_venn3",'mult'],
                        ['What is the roster notation for _AuBuC?','{0,2,3,4,6,8,9,10,12,14,15,16,17}',"fig_venn3",'mult'],
                        ['What is the roster notation for Au_Bu_C?','{0,1,2,3,4,5,6,7,8,9,10,14,15,16,17}',"fig_venn3",'mult'],
                        ['What is the roster notation for Au_BuC?','{0,1,2,3,4,5,6,7,8,9,12,15,16,17}',"fig_venn3",'mult'],
                        ['What is the roster notation for AuBu_C?','{0,1,2,3,4,5,6,7,8,9,10,12,14,16,17}',"fig_venn3",'mult'],
                        ['What is the roster notation for AuBuC?','{1,2,3,4,5,6,7,8,9,10,12,14,15}',"fig_venn3",'mult'],

                        # Venn & Words to Roster Notation
                        ['What is the roster notation for A union B?','{2,3,4,5,6,7}',"fig_venn3",'num'],
                        ['What is the roster notation for the union of A and C?','{2,3,4,5,6,8}',"fig_venn3",'num'],
                        ['What is the roster notation for B union C?','{2,3,4,5,7,8}',"fig_venn3",'num'],
                        ['What is the roster notation for the intersection of A and B?','{2,5}',"fig_venn3",'num'],
                        ['What is the roster notation for A intersect C?','{2,3}',"fig_venn3",'num'],
                        ['What is the roster notation for the intersection of B and C?','{2,4}',"fig_venn3",'num'],
                        ['What is the roster notation for the compliment of A?','{4,7,8,9}',"fig_venn3",'num'],
                        ['What is the roster notation for the compliment of B?','{3,6,8,9}',"fig_venn3",'num'],
                        ['What is the roster notation for the compliment of C?','{5,6,7,9}',"fig_venn3",'num'],
                        ['What is the roster notation for A union the compliment of B?','{2,3,5,6,8,9}',"fig_venn3",'num'],
                        ['What is the roster notation for the union of A and the compliment of C?','{2,3,5,6,7,9}',"fig_venn3",'num'],
                        ['What is the roster notation for B union the compliment of C?','{2,4,5,6,7,9}',"fig_venn3",'num'],
                        ['What is the roster notation for the compliment of A union B?','{2,4,5,7,8,9}',"fig_venn3",'num'],
                        ['What is the roster notation for the union of the compliment of A and the compliment of B?','{3,4,6,7,8,9}',"fig_venn3",'num'],
                        ['What is the roster notation for the compliment of A union C?','{2,3,4,7,8,9}',"fig_venn3",'num'],
                        ['What is the roster notation for the union of the compliment of A and the compliment of C?','{4,5,6,7,8,9}',"fig_venn3",'num'],
                        ['What is the roster notation for the compliment of B union C?','{2,3,4,6,8,9}',"fig_venn3",'num'],
                        ['What is the roster notation for the intersection of A and the compliment of B?','{3,6}',"fig_venn3",'num'],
                        ['What is the roster notation for A intersect the compliment of C?','{5,6}',"fig_venn3",'num'],
                        ['What is the roster notation for the intersection of B and the compliment of C?','{5,7}',"fig_venn3",'num'],
                        ['What is the roster notation for the compliment of A intersect B?','{4,7}',"fig_venn3",'num'],
                        ['What is the roster notation for the intersection of the complimet of A and the compliment of B?','{8,9}',"fig_venn3",'num'],
                        ['What is the roster notation for the compliment of A intersect C?','{4,8}',"fig_venn3",'num'],
                        ['What is the roster notation for the intersection of the compliment of A and the compliment of C?','{7,9}',"fig_venn3",'num'],
                        ['What is the roster notation for the compliment of B intersect C?','{3,8}',"fig_venn3",'num']
                        ],

                    'ca':[# Cardinality of Roster Notation
                        ['What is the cardinality of {0,1,2,3,4,5}?','6',"fig_venn3",'nofig'],
                        ['What is the cardinality of {5,4,3,2,9}?','5',"fig_venn3",'nofig'],
                        ['What is the cardinality of {0,1,1,0,0,1}?','2',"fig_venn3",'nofig'],
                        ['What is the cardinality of {5,3,4,3,2,5}?','4',"fig_venn3",'nofig'],
                        ['What is the cardinality of {1,{2,3},4,5,6}?','5',"fig_venn3",'nofig'],
                        ['What is the cardinality of {{0,1,2,3,4,5}}?','1',"fig_venn3",'nofig'],
                        ['What is the cardinality of {1,2,3,{1,2},{1,3},{2,1},{2,3},{1,2,3}?','7',"fig_venn3",'nofig'],
                        ['What is the cardinality of {}?','0',"fig_venn3",'nofig'],
                        ['What is the cardinality of {{}}?','1',"fig_venn3",'nofig'],
                        ['What is the cardinality of {{},{1},{2},{1,2}}?','4',"fig_venn3",'nofig'],

                        # Cardinality of Venn3
                        ['What is the cardinality of A?','4',"fig_venn3",'num'],
                        ['What is the cardinality of AuB?','6',"fig_venn3",'num'],
                        ['What is the cardinality of BnC?','2',"fig_venn3",'num'],
                        ['What is |C|?','4',"fig_venn3",'num'],
                        ['What is |BuC|?','6',"fig_venn3",'num'],
                        ['What is |BnC|?','2',"fig_venn3",'num'],
                        ['What is the cardinality of A?','9',"fig_venn3",'mult'],
                        ['What is |B|?','7',"fig_venn3",'mult'],
                        ['What is the cardinality of C?','5',"fig_venn3",'mult'],
                        ['What is the cardinality of AnB?','4',"fig_venn3",'mult'],
                        ['What is the cardinality of AnC?','3',"fig_venn3",'mult'],
                        ['What is |BnC|?','2',"fig_venn3",'mult'],
                        ['What is the cardinality of AuB?','12',"fig_venn3",'mult'],
                        ['What is |AuC|?','11',"fig_venn3",'mult'],
                        ['What is the cardinality of BuC?','10',"fig_venn3",'mult'],
                        ['What is |AnBnC|?','1',"fig_venn3",'mult'],
                        ['What is the cardinality of An_BnC?','2',"fig_venn3",'mult'],
                        ['What is |AnBn_C|?','3',"fig_venn3",'mult'],
                        ['What is the cardinality of _AnBnC?','1',"fig_venn3",'mult'],
                        ['What is |_An_BnC|?','1',"fig_venn3",'mult'],
                        ['What is the cardinality of _AnBn_C?','2',"fig_venn3",'mult'],
                        ['What is |_An_Bn_C|?','3',"fig_venn3",'mult'],
                        ['What is |U|?','16',"fig_venn3",'mult']
                        ],

                    'ps':[# Power Sets
                        ['Given A = {1,2,3,4}, how many elements are in the Power Set of A?','16',"fig_venn3",'nofig'],
                        ['Given A = {5,9,2}, how many elements are in the Power Set of A?','8',"fig_venn3",'nofig'],
                        ['Given A = {7}, how many elements are in the Power Set of A?','2',"fig_venn3",'nofig'],
                        ['Given A = {8,3}, how many elements are in the Power Set of A?','4',"fig_venn3",'nofig'],
                        ['Given A = {1,0,0,1,1,0,1,1}, what is |P(A)|?','4',"fig_venn3",'nofig'],
                        ['Given A = {4,1,5}, what is |P(A)|?','8',"fig_venn3",'nofig'],
                        ['Given A = {1,3,{4,5},6}, what is |P(A)|?','16',"fig_venn3",'nofig'],
                        ['Given A = {1,2,{1},{2,3},4}, what is |P(A)|?','32',"fig_venn3",'nofig'],
                        ['Given A = {{},1,2}, what is |P(A)|?','8',"fig_venn3",'nofig'],
                        ['Is |P(E)| = 24 possible? (T or F)','F',"fig_venn3",'nofig'],
                        ['Is |P(E)| = 64 possible? (T or F)','T',"fig_venn3",'nofig'],
                        ['Is P(E) = {{},{3}} a possible? (T or F)','T',"fig_venn3",'nofig'],
                        ['Is P(E) = {{},3} a possible? (T or F)','F',"fig_venn3",'nofig'],
                        ['Is P(E) = {{},{4},{5},{4,5}} a possible? (T or F)','T',"fig_venn3",'nofig'],
                        ['Is P(E) = {1,2,3,{1,2},{1,3},{2,3},{1,2,3} possible? (T or F)','F',"fig_venn3",'nofig'],
                        ['Is P(E) = {{1},{2},{3},{1,2},{1,3},{2,1},{2,3},{1,2,3}} a possible? (T or F)','F',"fig_venn3",'nofig'],
                        ['Given A = {3}, what is P(A)?','{{},{3}}',"fig_venn3",'nofig'],
                        ['Given A = {3,5}, what is P(A)?','{{},{3},{5},{3,5}}',"fig_venn3",'nofig'],
                        ['Given A = {3,5,7}, what is P(A)?','{{},{3},{5},{7},{3,5},{3,7},{5,7},{3,5,7}}',"fig_venn3",'nofig'],
                        ['Given A = {a}, what is P(A)?','{{},{a}}',"fig_venn3",'nofig'],
                        ['Given A = {a,b}, what is P(A)?','{{},{a},{b},{a,b}}',"fig_venn3",'nofig'],
                        ['Given A = {a,b,c}, what is P(A)?','{{},{a},{b},{c},{a,b},{a,c},{b,c},{a,b,c}}',"fig_venn3",'nofig']
                        ],

                    'dm':[# DeMorgan's Law
                        ['Given U = {1,2,3,4,5,6,7,8,9,10}, _A = {5,6,7}, and _B = {7}, what is _(AuB)?','{7}',"fig_venn3",'nofig'],
                        ['Given U = {0,3,6,9,12,15,18}, _A = {6,12,18}, and _B = {6,9,12,18}, what is _(AnB)','{6,9,12,18}',"fig_venn3",'nofig'],
                        ['Given U = {1,2,3,4,5,6,7,8,9}, _A = {3,4,5,8}, and _B = {1,4,6,9}, what is _(AuB)?','{4}',"fig_venn3",'nofig'],
                        ['Given U = {1,2,3,4,5,6,7,8,9}, _A = {2,3,7,8,9}, and _B = {3,4,5,6,9}, what is _(AnB)?','{2,3,4,5,6,7,8,9}',"fig_venn3",'nofig'],
                        ['Given U = {1,2,3,4,5,6,7,8,9}, _A = {1,2,4,5}, and _B = {1,3,6,7,8,9}, what is _(AnB)?','{1,2,3,4,5,6,7,8,9}',"fig_venn3",'nofig'],
                        ['Given U = {1,2,3,4,5,6,7,8,9}, _A = {2,3,5,7,8,9}, and _B = {1,4,5,6,8}, what is _(AuB)?','{5,8}',"fig_venn3",'nofig']
                        ],

                    'sb':[# Set Builder Notation to Roster Notation
                        ['Given A = {xEN | 1 <= x <= 7}, what is the roster form?','{1,2,3,4,5,6,7}',"fig_venn3",'nofig'],
                        ['Given A = {xEN | 3 < x <= 9}, what is the roster form?','{4,5,6,7,8,9}',"fig_venn3",'nofig'],
                        ['Given A = {xEN | 2 <= x < 8}, what is the roster form?','{2,3,4,5,6,7}',"fig_venn3",'nofig'],
                        ['Given A = {xEN | 4 < x < 6}, what is the roster form?','{5}',"fig_venn3",'nofig'],
                        ['Given A = {xEZ | -1 <= x <= 3}, what is the roster form?','{-1,0,1,2,3}',"fig_venn3",'nofig'],
                        ['Given A = {xEZ | -3 < x <= 2}, what is the roster form?','{-2,-1,0,1,2}',"fig_venn3",'nofig'],
                        ['Given A = {xEZ | -2 <= x < 1}, what is the roster form?','{-2,-1,0}',"fig_venn3",'nofig'],
                        ['Given A = {xEZ | -4 < x < 0}, what is the roster form?','{-3,-2,-1}',"fig_venn3",'nofig']
                        ],

                    'ss':[# Subsets and Proper Subsets

                        #Question from "fig_venn3"('abc')
                        ['{d,g,g,d,f} is a subset of B? (T/F)','T',"fig_venn3",'abc'],
                        ['{} is not a subset of B={a,b,c,d}.(T/F)','F',"fig_venn3",'abc'],
                        ['{} is a subset of C.(T/F)','T',"fig_venn3",'abc'],
                        ['Is d is an element of C? (T/F)','F',"fig_venn3", 'abc'],
                        ['{a,d,g,e,g,f} is not a subset of A (T/F)','T',"fig_venn3", 'abc'],

                        #Question from "fig_venn3"('num')
                        ['How many subsets are there in the Set C = {2,3,4,8}','16',"fig_venn3",'num'],
                        ['{} is a subset of A = {2,3,5,6} (T/F)','T',"fig_venn3",'num'],
                        ['5 is not a subset of A (T/F)','F',"fig_venn3",'num'],
                        ['How many subsets are there in the set A = {2,3,5,6}','16',"fig_venn3",'num'],



                        #Questions of (no_fig)
                        ['Given A = {2,5,6,7,9,10}, B = {2,7,10}, C = {1,2,5,7,9,10}, B is not a subset of A (T/F)','F',"fig_venn3",'nofig'],
                        ['Given A = {2,5,6,7,9,10}, B = {2,7,10}, C = {1,2,5,7,9,10}, C is not a subset of A (T/F)','T',"fig_venn3",'nofig'],
                        ['Given A = {2,5,6,7,9,10}, B = {2,7,10}, C = {1,2,5,7,9,10}, B is a subset of A (T/F)','T',"fig_venn3",'nofig'],
                        ['Given A = {2,4,6,7,9,10}, B = {2,6,7,10}, C = {1,5,7}, C is a subset of B (T/F)','F',"fig_venn3",'nofig']

                        ],

                    'v2':[# Venn2
                        ['78 students were surveyed, 28 students took calculus, 39 students took physics, and 18 students took neither. How many students took both?','7',"fig_venn3",'nofig'],
                        ['30 students took calculus, 41 students took physics, and 8 students took both, and 19 students took neither. How any students were surveyed?','82',"fig_venn3",'nofig'],
                        ['86 students were surveyed, 32 students took calculus, 43 students took physics, and 9 students took both. How many students took neither?','20',"fig_venn3",'nofig'],
                        ['90 students were surveyed, 34 students took calculus, 45 students took physics, and 10 students took both. How many students took at least one class?','69',"fig_venn3",'nofig'],
                        ['36 students took calculus, 47 students took physics, 36 students took only physics, and 22 students took neither. How many students took at least one class?','72',"fig_venn3",'nofig'],
                        ['98 students were surveyed, 38 students took calculus, 49 students took physics, and 12 students took both. How any students took less than 2 classes?','86',"fig_venn3",'nofig'],
                        ['27 students took only calculus, 38 students took only physics, 13 students took both calculus and physics, and 24 students took neither. How many students were surveyed?','102',"fig_venn3",'nofig'],
                        ['28 students took only calculus, 39 students took only physics, 14 students took both calculus and physics, and 106 students were surveyed. How many students took neither?','25',"fig_venn3",'nofig'],
                        ['29 students took only calculus, 40 students took only physics, 26 students took neither, and 110 students were surveyed. How many students took calculus?','44',"fig_venn3",'nofig'],
                        ['30 students took only calculus, 41 students took only physics, 27 students took neither, and 114 students were surveyed. How many students took physics?','57',"fig_venn3",'nofig'],
                        ['31 students took only calculus, 42 students took only physics, 17 students took both calculus and physics, and 28 students took neither. How many students took calculus?','48',"fig_venn3",'nofig'],
                        ['122 students were surveyd, 32 students took only calculus, 43 students took only physics, and 18 students took both calculus and physics. How many students took calculus?','50',"fig_venn3",'nofig'],
                        ['33 students took only calculus, 44 students took only physics, 19 students took both calculus and physics, and 30 students took neither. How many students took physics?','63',"fig_venn3",'nofig'],
                        ['130 students were surveyd, 34 students took only calculus, 45 students took only physics, and 20 students took both calculus and physics. How many students took physics?','65',"fig_venn3",'nofig']
                          ],

                    'v3':[# Venn3 Word Problems
                        ['New drugs (Albanine, Betroxin, and Cepterol) were given to 149 patients.\n122 patients showed a positive reaction.\nAlbanine produced 73 positive reactions.\nBetroxin produced 52 positive reactions.\nCepterol produced 62 positive reations.\nAll cases where Albanine and Betroxin were used together produced 26 positive reactions.\nAll cases where Albanine and Cepterol were used together produced 31 positive reations.\nAll cases where Betroxin and Cepterol were used together produced 23 positive reations.\nWhat drug or combination of drugs produced the highest positive results? (ie. DNF=13)','An_Bn_C=31',"fig_venn3",'nofig'],
                        ['New drugs (Albanine, Betroxin, and Cepterol) were given to 157 patients.\n129 patients showed a positive reaction.\nAlbanine produced 77 positive reactions.\nBetroxin produced 56 positive reactions.\nCepterol produced 66 positive reations.\nAll cases where Albanine and Betroxin were used together produced 28 positive reactions.\nAll cases where Albanine and Cepterol were used together produced 33 positive reations.\nAll cases where Betroxin and Cepterol were used together produced 25 positive reations.\nWhat drug or combination of drugs produced the lowest positive results? (ie. DNF=13)','_AnBnC=9',"fig_venn3",'nofig'],
                        ['New drugs (Albanine, Betroxin, and Cepterol) were given to 165 patients.\n136 patients showed a positive reaction.\nAlbanine produced 81 positive reactions.\nBetroxin produced 60 positive reactions.\nCepterol produced 70 positive reations.\nAll cases where Albanine and Betroxin were used together produced 30 positive reactions.\nAll cases where Albanine and Cepterol were used together produced 35 positive reations.\nAll cases where Betroxin and Cepterol were used together produced 27 positive reations.\nWhat were the results for the combination of all three drugs? (ie. DNF=13)','AnBnC=17',"fig_venn3",'nofig'],
                        ['New drugs (Albanine, Betroxin, and Cepterol) were given to 173 patients.\n143 patients showed a positive reaction.\nAlbanine produced 85 positive reactions.\nBetroxin produced 64 positive reactions.\nCepterol produced 74 positive reations.\nAll cases where Albanine and Betroxin were used together produced 32 positive reactions.\nAll cases where Albanine and Cepterol were used together produced 37 positive reations.\nAll cases where Betroxin and Cepterol were used together produced 29 positive reations.\nWhat were the results for the combination of only Albanine and Betroxin? (ie. DNF=13)','AnBn_C=14',"fig_venn3",'nofig'],
                        ['New drugs (Albanine, Betroxin, and Cepterol) were given to 181 patients.\n150 patients showed a positive reaction.\nAlbanine produced 89 positive reactions.\nBetroxin produced 68 positive reactions.\nCepterol produced 78 positive reations.\nAll cases where Albanine and Betroxin were used together produced 34 positive reactions.\nAll cases where Albanine and Cepterol were used together produced 39 positive reations.\nAll cases where Betroxin and Cepterol were used together produced 31 positive reations.\nWhat were the results for the combination of only Albanine and Cepterol? (ie. DNF=13)','An_BnC=20',"fig_venn3",'nofig'],
                        ['New drugs (Albanine, Betroxin, and Cepterol) were given to 189 patients.\n157 patients showed a positive reaction.\nAlbanine produced 93 positive reactions.\nBetroxin produced 72 positive reactions.\nCepterol produced 82 positive reations.\nAll cases where Albanine and Betroxin were used together produced 36 positive reactions.\nAll cases where Albanine and Cepterol were used together produced 41 positive reations.\nAll cases where Betroxin and Cepterol were used together produced 33 positive reations.\nWhat were the results for the combination of only Betroxin and Cepterol? (ie. DNF=13)','_AnBnC=13',"fig_venn3",'nofig'],
                        ['New drugs (Albanine, Betroxin, and Cepterol) were given to 197 patients.\n164 patients showed a positive reaction.\nAlbanine produced 97 positive reactions.\nBetroxin produced 76 positive reactions.\nCepterol produced 86 positive reations.\nAll cases where Albanine and Betroxin were used together produced 38 positive reactions.\nAll cases where Albanine and Cepterol were used together produced 43 positive reations.\nAll cases where Betroxin and Cepterol were used together produced 35 positive reations.\nWhat were the results for Betroxin only? (ie. DNF=13)','_AnBn_C=24',"fig_venn3",'nofig'],
                        ['New drugs (Albanine, Betroxin, and Cepterol) were given to 205 patients.\n171 patients showed a positive reaction.\nAlbanine produced 101 positive reactions.\nBetroxin produced 80 positive reactions.\nCepterol produced 90 positive reations.\nAll cases where Albanine and Betroxin were used together produced 40 positive reactions.\nAll cases where Albanine and Cepterol were used together produced 45 positive reations.\nAll cases where Betroxin and Cepterol were used together produced 37 positive reations.\nWhat were the results for Cepterol only? (ie. DNF=13)','_An_BnC=30',"fig_venn3",'nofig']
                          ],

                    'pt':[# Propositional Logic to Truth Tables
# |  P   |  Q   | _P   | _Q   | a   | b   | c   | d   | e   | f   | g   | h   | i   | j   | k   | l   | m   | n   | o   | p   |
# |------|------|------|------|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
# | T    | T    | F    | F    | F   | F   | F   | F   | F   | F   | F   | F   | T   | T   | T   | T   | T   | T   | T   | T   |
# | T    | F    | F    | T    | F   | F   | F   | F   | T   | T   | T   | T   | F   | F   | F   | F   | T   | T   | T   | T   |
# | F    | T    | T    | F    | F   | F   | T   | T   | F   | F   | T   | T   | F   | F   | T   | T   | F   | F   | T   | T   |
# | F    | F    | T    | T    | F   | T   | F   | T   | F   | T   | F   | T   | F   | T   | F   | T   | F   | T   | F   | T   |
                        ['What is the Truth Table output for a tautology?','p',"fig_tru",'TTTT'],
                        ['What is the Truth Table output for a contradiction?','a',"fig_tru",'FFFF'],

                        ['What is the Truth Table output for P?','m',"fig_tru",'TTFF'],
                        ['What is the Truth Table output for Q?','k',"fig_tru",'TFTF'],
                        ['What is the Truth Table output for _P?','d',"fig_tru",'FFTT'],
                        ['What is the Truth Table output for _Q?','f',"fig_tru",'FTFT'],
                        ['What is the Truth Table output for P^Q?','i',"fig_tru",'TFFF'],
                        ['What is the Truth Table output for PvQ?','o',"fig_tru",'TTTF'],
                        ['What is the Truth Table output for _P^Q?','c',"fig_tru",'FFTF'],
                        ['What is the Truth Table output for _PvQ?','l',"fig_tru",'TFTT'],
                        ['What is the Truth Table output for P^_Q?','e',"fig_tru",'FTFF'],
                        ['What is the Truth Table output for Pv_Q?','n',"fig_tru",'TTFT'],
                        ['What is the Truth Table output for _P^_Q?','b',"fig_tru",'FFFT'],
                        ['What is the Truth Table output for _Pv_Q?','h',"fig_tru",'FTTT'],
                        ['What is the Truth Table output for P^_P?','a',"fig_tru",'FFF'],
                        ['What is the Truth Table output for P^F?','a',"fig_tru",'FFFF'],
                        ['What is the Truth Table output for F?','a',"fig_tru",'FFFF'],
                        ['What is the Truth Table output for Pv_P?','p',"fig_tru",'TTTT'],
                        ['What is the Truth Table output for PvT?','p',"fig_tru",'TTTT'],
                        ['What is the Truth Table output for _(P^Q)?','h',"fig_tru",'FTTT'],
                        ['What is the Truth Table output for P->Q?','l',"fig_tru",'TFTT'],
                        ['What is the Truth Table output for _(P^_Q)?','l',"fig_tru",'TFTT'],
                        ['What is the Truth Table output for _Q->_P?','l',"fig_tru",'TFTT'],
                        ['What is the Truth Table output for _P->_Q?','n',"fig_tru",'TTFT'],
                        ['What is the Truth Table output for Q->P?','n',"fig_tru",'TTFT'],
                        ['What is the Truth Table output for _(_P^Q)?','n',"fig_tru",'TTFT'],
                        ['What is the Truth Table output for _P->Q?','o',"fig_tru",'TTTF'],
                        ['What is the Truth Table output for QvP?','o',"fig_tru",'TTTF'],
                        ['What is the Truth Table output for Q^P?','i',"fig_tru",'TFFF'],
                        ['What is the Truth Table output for _(P->_Q)?','i',"fig_tru",'TFFF'],
                        ['What is the Truth Table output for _(_PvQ)?','e',"fig_tru",'FTFF'],
                        ['What is the Truth Table output for _(P->Q)?','e',"fig_tru",'FTFF'],
                        ['What is the Truth Table output for _(Pv_Q)?','c',"fig_tru",'FFTF'],
                        ['What is the Truth Table output for _(Q->P)?','c',"fig_tru",'FFTF']
                          ],

                    'ls':[# Logic Symbols
                        ['What is "_"?','NOT',"fig_venn3",'nofig'],
                        ['What is "^"?','AND',"fig_venn3",'nofig'],
                        ['What is "v"?','OR',"fig_venn3",'nofig'],
                        ['What is "+o"?','XOR',"fig_venn3",'nofig'],
                        ['What is "->"?','conditional',"fig_venn3",'nofig'],
                        ['What is "<->"?','biconditional',"fig_venn3",'nofig'],
                        ['What is the symbol for "NOT"?','_',"fig_venn3",'nofig'],
                        ['What is the symbol for "AND"?','^',"fig_venn3",'nofig'],
                        ['What is the symbol for "OR"?','v',"fig_venn3",'nofig'],
                        ['What is the symbol for "XOR"?','+o',"fig_venn3",'nofig'],
                        ['What is the symbol for "conditional"?','->',"fig_venn3",'nofig'],
                        ['What is the symbol for "biconditional"?','<->',"fig_venn3",'nofig'],
                        ['When parentheses are not present, what is first symbol in precedence? Pv_Q^R+oP<->R->Q','_',"fig_venn3",'nofig'],
                        ['When parentheses are not present, what is second symbol in precedence? Pv_Q^R+oP<->R->Q','^',"fig_venn3",'nofig'],
                        ['When parentheses are not present, what is third symbol in precedence? Pv_Q^R+oP<->R->Q','v',"fig_venn3",'nofig'],
                        ['When parentheses are not present, what is fourth symbol in precedence? Pv_Q^R+oP<->R->Q','+o',"fig_venn3",'nofig'],
                        ['When parentheses are not present, what is fifth symbol in precedence? Pv_Q^R+oP<->R->Q','->',"fig_venn3",'nofig'],
                        ['When parentheses are not present, what is sixth symbol in precedence? Pv_Q^R+oP<->R->Q','<->',"fig_venn3",'nofig'],
                        ['When parentheses are not present, what is first symbol in precedence? P+o_Q^RvP<->R->Q','_',"fig_venn3",'nofig'],
                        ['When parentheses are not present, what is second symbol in precedence? P+o_Q^RvP<->R->Q','^',"fig_venn3",'nofig'],
                        ['When parentheses are not present, what is third symbol in precedence? P+o_Q^RvP<->R->Q','+o',"fig_venn3",'nofig'],
                        ['When parentheses are not present, what is fourth symbol in precedence? P+o_Q^RvP<->R->Q','v',"fig_venn3",'nofig'],
                        ['When parentheses are not present, what is fifth symbol in precedence? P+o_Q^RvP<->R->Q','->',"fig_venn3",'nofig'],
                        ['When parentheses are not present, what is sixth symbol in precedence? P+o_Q^RvP<->R->Q','<->',"fig_venn3",'nofig'],
                        ['Use parentheses to show what operations occurs first? Pv_Q^R+oP<->R->Q','(_Q)',"fig_venn3",'nofig'],
                        ['Use parentheses to show what operations occurs second? Pv_Q^R+oP<->R->Q','((_Q)^R)',"fig_venn3",'nofig'],
                        ['Use parentheses to show what operations occurs third? Pv_Q^R+oP<->R->Q','(Pv((_Q)^R))',"fig_venn3",'nofig'],
                        ['Use parentheses to show what operations occurs fourth? Pv_Q^R+oP<->R->Q','((Pv((_Q)^R))+oP)',"fig_venn3",'nofig'],
                        ['Use parentheses to show what operations occurs fifth? Pv_Q^R+oP<->R->Q','(R->Q)',"fig_venn3",'nofig'],
                        ['Use parentheses to show what operations occurs sixth? Pv_Q^R+oP<->R->Q','(((Pv((_Q)^R))+oP)<->(R->Q))',"fig_venn3",'nofig'],
                        ['Use parentheses to show what operations occurs first? P+o_Q^RvP<->R->Q','(_Q)',"fig_venn3",'nofig'],
                        ['Use parentheses to show what operations occurs second? P+o_Q^RvP<->R->Q','((_Q)^R)',"fig_venn3",'nofig'],
                        ['Use parentheses to show what operations occurs third? P+o_Q^RvP<->R->Q','(P+o((_Q)^R))',"fig_venn3",'nofig'],
                        ['Use parentheses to show what operations occurs fourth? P+o_Q^RvP<->R->Q','((P+o((_Q)^R))vP)',"fig_venn3",'nofig'],
                        ['Use parentheses to show what operations occurs fifth? P+o_Q^RvP<->R->Q','(R->Q)',"fig_venn3",'nofig'],
                        ['Use parentheses to show what operations occurs sixth? P+o_Q^RvP<->R->Q','(((P+o((_Q)^R))vP)<->(R->Q))',"fig_venn3",'nofig']
                          ],

                    'kp':[# Karnaugh-2 Maps to Unsimplified Propositional Logic

                        ['What is the logic equation for the Karnaugh map in terms of P? (Use _ for NOT, v for OR, and ^ for AND)','P^_P',"fig_kmap2",'FFFF'],
                        ['What is the logic equation for the Karnaugh map in terms of Q? (Use _ for NOT, v for OR, and ^ for AND)','Q^_Q',"fig_kmap2",'FFFF'],
                        ['What is the logic equation for the Karnaugh map? (Use _ for NOT, v for OR, and ^ for AND)','_P^_Q',"fig_kmap2",'FFFT'],
                        ['What is the logic equation for the Karnaugh map? (Use _ for NOT, v for OR, and ^ for AND)','_P^Q',"fig_kmap2",'FFTF'],
                        ['What is the logic equation for the Karnaugh map? (Use _ for NOT, v for OR, and ^ for AND)','(_P^Q)v(_P^_Q)',"fig_kmap2",'FFTT'], # Simplified: _P
                        ['What is the logic equation for the Karnaugh map? (Use _ for NOT, v for OR, and ^ for AND)','P^_Q',"fig_kmap2",'FTFF'],
                        ['What is the logic equation for the Karnaugh map? (Use _ for NOT, v for OR, and ^ for AND)','(P^_Q)v(_P^_Q)',"fig_kmap2",'FTFT'], # Simplified: _Q
                        ['What is the logic equation for the Karnaugh map? (Use _ for NOT, v for OR, and ^ for AND)','(P^_Q)v(_P^Q)',"fig_kmap2",'FTTF'],
                        ['What is the logic equation for the Karnaugh map? (Use _ for NOT, v for OR, and ^ for AND)','(P^_Q)v(_P^Q)v(_P^_Q)',"fig_kmap2",'FTTT'], # Simplified: _Qv_P^Q
                        ['What is the logic equation for the Karnaugh map? (Use _ for NOT, v for OR, and ^ for AND)','P^Q',"fig_kmap2",'TFFF'],
                        ['What is the logic equation for the Karnaugh map? (Use _ for NOT, v for OR, and ^ for AND)','(P^Q)v(_P^_Q)',"fig_kmap2",'TFFT'],
                        ['What is the logic equation for the Karnaugh map? (Use _ for NOT, v for OR, and ^ for AND)','(P^Q)v(_P^Q)',"fig_kmap2",'TFTF'], # Simplified: Q
                        ['What is the logic equation for the Karnaugh map? (Use _ for NOT, v for OR, and ^ for AND)','(P^Q)v(_P^Q)v(_P^_Q)',"fig_kmap2",'TFTT'], # Simplified: Qv_P^_Q
                        ['What is the logic equation for the Karnaugh map? (Use _ for NOT, v for OR, and ^ for AND)','(P^Q)v(P^_Q)',"fig_kmap2",'TTFF'], # Simplified: P
                        ['What is the logic equation for the Karnaugh map? (Use _ for NOT, v for OR, and ^ for AND)','(P^Q)v(P^_Q)v(_P^_Q)',"fig_kmap2",'TTFT'], # Simplified: P^Qv_Q
                        ['What is the logic equation for the Karnaugh map? (Use _ for NOT, v for OR, and ^ for AND)','(P^Q)v(P^_Q)v(_P^Q)',"fig_kmap2",'TTTF'], # Simplified: Pv_P^Q
                        ['What is the logic equation for the Karnaugh map? (Use _ for NOT, v for OR, and ^ for AND)','(P^Q)v(P^_Q)v(_P^Q)v(_P^_Q)',"fig_kmap2",'TTTT'],
                        ['What is the logic equation for the Karnaugh map in terms of P? (Use _ for NOT, v for OR, and ^ for AND)','Pv_P',"fig_kmap2",'TTTT'],
                        ['What is the logic equation for the Karnaugh map in terms of Q? (Use _ for NOT, v for OR, and ^ for AND)','Qv_Q',"fig_kmap2",'TTTT']

                         ],

                    'pk':[# Propositional Logic to Karnaugh-2 Map

                        ['Which Karnaugh map is the equivalent to the equation: F?','a',"fig_kmap2",'all'],                           # FFFF
                        ['Which Karnaugh map is a contradiction?','a',"fig_kmap2",'all'],                                             # ^
                        ['Which Karnaugh map is the equivalent to the equation: P^_P?','a',"fig_kmap2",'all'],                        # ^
                        ['Which Karnaugh map is the equivalent to the equation: Q^_Q?','a',"fig_kmap2",'all'],                        # ^
                        ['Which Karnaugh map is the equivalent to the equation: (PvQ)^(Pv_Q)^(_PvQ)^(_Pv_Q)?','a',"fig_kmap2",'all'], # ^      # New equation another F representation
                        ['Which Karnaugh map is the equivalent to the equation: _P^_Q?','b',"fig_kmap2",'all'],                       # FFFT
                        ['Which Karnaugh map is the equivalent to the equation: _(_P->Q)?','b',"fig_kmap2",'all'],                    # ^      # New equation using ->
                        ['Which Karnaugh map is the equivalent to the equation: _P^Q?','c',"fig_kmap2",'all'],                        # FFTF
                        ['Which Karnaugh map is the equivalent to the equation: _(_P->_Q)?','c',"fig_kmap2",'all'],                   # ^      # New equation using ->
                        ['Which Karnaugh map is the equivalent to the equation: (_P^Q)v(_P^_Q)?','d',"fig_kmap2",'all'],              # FFTT
                        ['Which Karnaugh map is the equivalent to the equation: _P?','d',"fig_kmap2",'all'],                          # ^
                        ['Which Karnaugh map is the equivalent to the equation: P^_Q?','e',"fig_kmap2",'all'],                        # FTFF
                        ['Which Karnaugh map is the equivalent to the equation: _(P->Q)?','e',"fig_kmap2",'all'],                     # ^      # New equation using ->
                        ['Which Karnaugh map is the equivalent to the equation: (P^_Q)v(_P^_Q)?','f',"fig_kmap2",'all'],              # FTFT
                        ['Which Karnaugh map is the equivalent to the equation: _Q?','f',"fig_kmap2",'all'],                          # ^
                        ['Which Karnaugh map is the equivalent to the equation: (P^_Q)v(_P^Q)?','g',"fig_kmap2",'all'],               # FTTF
                        ['Which Karnaugh map is the equivalent to the equation: _P<->Q?','g',"fig_kmap2",'all'],                      # ^      # New equation using <->
                        ['Which Karnaugh map is the equivalent to the equation: P<->_Q?','g',"fig_kmap2",'all'],                      # ^      # New equation using <->
                        ['Which Karnaugh map is the equivalent to the equation: (P^_Q)v(_P^Q)v(_P^_Q)?','h',"fig_kmap2",'all'],       # FTTT
                        ['Which Karnaugh map is the equivalent to the equation: _Pv_Q?','h',"fig_kmap2",'all'],                       # ^      # Changed from _Qv_P to _Pv_Q
                        ['Which Karnaugh map is the equivalent to the equation: P->_Q?','h',"fig_kmap2",'all'],                       # ^      # New equation using ->
                        ['Which Karnaugh map is the equivalent to the equation: P^Q?','i',"fig_kmap2",'all'],                         # TFFF   # Change from equivalvnt to equivalent
                        ['Which Karnaugh map is the equivalent to the equation: _(P->_Q)?','i',"fig_kmap2",'all'],                    # ^      # New equation using ->
                        ['Which Karnaugh map is the equivalent to the equation: (P^Q)v(_P^_Q)?','j',"fig_kmap2",'all'],               # TFFT
                        ['Which Karnaugh map is the equivalent to the equation: P<->Q?','j',"fig_kmap2",'all'],                       # ^      # New equation using <->
                        ['Which Karnaugh map is the equivalent to the equation: _P<->_Q?','j',"fig_kmap2",'all'],                     # ^      # New equation using <->
                        ['Which Karnaugh map is the equivalent to the equation: (P^Q)v(_P^Q)?','k',"fig_kmap2",'all'],                # TFTF
                        ['Which Karnaugh map is the equivalent to the equation: Q?','k',"fig_kmap2",'all'],                           # ^
                        ['Which Karnaugh map is the equivalent to the equation: (P^Q)v(_P^Q)v(_P^_Q)?','l',"fig_kmap2",'all'],        # TFTT
                        ['Which Karnaugh map is the equivalent to the equation: _PvQ?','l',"fig_kmap2",'all'],                        # ^      # Changed V to v
                        ['Which Karnaugh map is the equivalent to the equation: P->Q?','l',"fig_kmap2",'all'],                        # ^      # New equation using ->
                        ['Which Karnaugh map is the equivalent to the equation: (P^Q)v(P^_Q)?','m',"fig_kmap2",'all'],                # TTFF
                        ['Which Karnaugh map is the equivalent to the equation: P?','m',"fig_kmap2",'all'],                           # ^
                        ['Which Karnaugh map is the equivalent to the equation: (P^Q)v(P^_Q)v(_P^_Q)?','n',"fig_kmap2",'all'],        # TTFT
                        ['Which Karnaugh map is the equivalent to the equation: Pv_Q?','n',"fig_kmap2",'all'],                        # ^      # Changed from P_Q to Pv_Q
                        ['Which Karnaugh map is the equivalent to the equation: _P->_Q?','n',"fig_kmap2",'all'],                      # ^      # New equation using ->
                        ['Which Karnaugh map is the equivalent to the equation: (P^Q)v(P^_Q)v(_P^Q)?','o',"fig_kmap2",'all'],         # TTTF
                        ['Which Karnaugh map is the equivalent to the equation: PvQ?','o',"fig_kmap2",'all'],                         # ^      # Changed V to v
                        ['Which Karnaugh map is the equivalent to the equation: _P->Q?','o',"fig_kmap2",'all'],                       # ^      # New equation using ->
                        ['Which Karnaugh map is the equivalent to the equation: (P^Q)v(P^_Q)v(_P^Q)v(_P^_Q)?','p',"fig_kmap2",'all'], # TTTT
                        ['Which Karnaugh map is the equivalent to the equation: Pv_P?','p',"fig_kmap2",'all'],                        # ^      # New equation another T representation
                        ['Which Karnaugh map is the equivalent to the equation: Qv_Q?','p',"fig_kmap2",'all'],                        # ^      # New equation another T representation
                        ['Which Karnaugh map is the equivalent to the equation: T?','p',"fig_kmap2",'all'],                           # ^
                        ['Which Karnaugh map is a tautology?','p',"fig_kmap2",'all']                                                  # ^

                          ],

                    'pe':[# Proof by equivalence for Propositional Logic

                        ['Do the propositional logic expressions \'_(P->_Q)\' and \'P^Q\' have the same output? (YES/NO)','YES',"fig_tru",''],                     # YES
                        ['Do the propositional logic expressions \'Q^(_Pv_Q)\' and \'_P^Q\' have the same output? (YES/NO)','YES',"fig_tru",''],                   # ^
                        ['Do the propositional logic expressions \'(Pv_Q)^(_PvQ)\' and \'P<->Q\' have the same output? (YES/NO)','YES',"fig_tru",''],              # ^
                        ['Do the propositional logic expressions \'(QvQ)^(QvP)\' and \'Q\' have the same output? (YES/NO)','YES',"fig_tru",''],                    # ^
                        ['Do the propositional logic expressions \'_P->Q\' and \'PvQ\' have the same output? (YES/NO)','YES',"fig_tru",''],                        # ^
                        ['Do the propositional logic expressions \'_(P<->Q)\' and \'P<->_Q\' have the same output? (YES/NO)','YES',"fig_tru",''],                  # ^
                        ['Do the propositional logic expressions \'_(Pv(_P^Q))\' and \'_P^_Q\' have the same output? (YES/NO)','YES',"fig_tru",''],                # ^
                        ['Do the propositional logic expressions \'(P^Q)v(_P^Q)v(_P^_Q)\' and \'P->Q\' have the same output? (YES/NO)','YES',"fig_tru",''],        # ^
                        ['Do the propositional logic expressions \'(P^Q)v(P^_Q)^(_P^Q)\' and \'P^Q\' have the same output? (YES/NO)','YES',"fig_tru",''],          # ^
                        ['Do the propositional logic expressions \'_(_P^_Q)\' and \'PvQ\' have the same output? (YES/NO)','YES',"fig_tru",''],                     # ^
                        ['Do the propositional logic expressions \'P->Q\' and \'_Q->_P\' have the same output? (YES/NO)','YES',"fig_tru",''],                      # ^
                        ['Do the propositional logic expressions \'(_P^Q)v(Pv_Q)^(P^Q)\' and \'Q\' have the same output? (YES/NO)','YES',"fig_tru",''],            # ^
                        ['Do the propositional logic expressions \'_(P->_Q)\' and \'Q\' have the same output? (YES/NO)','NO',"fig_tru",''],                        # NO
                        ['Do the propositional logic expressions \'_(P^(_P^Q))\' and \'_P^_Q\' have the same output? (YES/NO)','NO',"fig_tru",''],                 # ^
                        ['Do the propositional logic expressions \'P<->Q\' and \'_(P^Q)^(PvQ)\' have the same output? (YES/NO)','NO',"fig_tru",''],                # ^
                        ['Do the propositional logic expressions \'(P->Q)^(_P->Q)\' and \'P<->Q\' have the same output? (YES/NO)','NO',"fig_tru",''],              # ^
                        ['Do the propositional logic expressions \'Pv_P\' and \'F\' have the same output? (YES/NO)','NO',"fig_tru",''],                            # ^
                        ['Do the propositional logic expressions \'P^((Qv(Q^P))v_Q)\' and \'Q\' have the same output? (YES/NO)','NO',"fig_tru",''],                # ^
                        ['Do the propositional logic expressions \'_(_Q^(Pv(_PvQ)))\' and \'P\' have the same output? (YES/NO)','NO',"fig_tru",''],                # ^
                        ['Do the propositional logic expressions \'_Pv_(Q^(Qv(Pv(P^Q))))\' and \'_(_P^Q)\' have the same output? (YES/NO)','NO',"fig_tru",''],     # ^
                        ['Do the propositional logic expressions \'(_P^Q)v(Pv_Q)v(P^Q)\' and \'F\' have the same output? (YES/NO)','NO',"fig_tru",''],             # ^
                        ['Do the propositional logic expressions \'(_P^Q)v(P^_Q)^(PvQ)\' and \'(P^Q)v(_P^_Q)\' have the same output? (YES/NO)','NO',"fig_tru",''], # ^
                        ['Do the propositional logic expressions \'_P^_Q\' and \'_(P^Q)\' have the same output? (YES/NO)','NO',"fig_tru",''],                      # ^
                        ['Do the propositional logic expressions \'_(P->_Q)\' and \'PvQ\' have the same output? (YES/NO)','NO',"fig_tru",'']                       # ^

                          ],

                    'cp':[# Circuits to Propositional Logic
                        ['What is the propositional logic statement for this circuit?','P^Q',"fig_circ",'P^Q'],
                        ['What is the propositional logic statement for this circuit?','PvQ',"fig_circ",'PvQ'],
                        ['What is the propositional logic statement for this circuit?','_P^Q',"fig_circ",'_P^Q'],
                        ['What is the propositional logic statement for this circuit?','_PvQ',"fig_circ",'_PvQ'],
                        ['What is the propositional logic statement for this circuit?','P^_Q',"fig_circ",'P^_Q'],
                        ['What is the propositional logic statement for this circuit?','Pv_Q',"fig_circ",'Pv_Q'],
                        ['What is the propositional logic statement for this circuit?','_P^_Q',"fig_circ",'_P^_Q'],
                        ['What is the propositional logic statement for this circuit?','_Pv_Q',"fig_circ",'_Pv_Q'],
                        ['What is the propositional logic statement for this circuit?','(P^_Q)v(_P^_Q)',"fig_circ",'(P^_Q)v(_P^_Q)'],
                        ['What is the propositional logic statement for this circuit?','(_P^Q)v(_P^_Q)',"fig_circ",'(_P^Q)v(_P^_Q)'],
                        ['What is the propositional logic statement for this circuit?','(P^Q)v(_P^_Q)',"fig_circ",'(P^Q)v(_P^_Q)'],
                        ['What is the propositional logic statement for this circuit?','(_P^Q)v(P^_Q)',"fig_circ",'(_P^Q)v(P^_Q)'],
                        ['What is the propositional logic statement for this circuit?','(_P^Q)v(_P^_Q)',"fig_circ",'(_P^Q)v(_P^_Q)'],
                        ['What is the propositional logic statement for this circuit?','(P^_Q)v(_P^Q)v(_P^_Q)',"fig_circ",'(P^_Q)v(_P^Q)v(_P^_Q)'],
                        ['What is the propositional logic statement for this circuit?','(P^Q)v(_P^Q)v(_P^_Q)',"fig_circ",'(P^Q)v(_P^Q)v(_P^_Q)'],
                        ['What is the propositional logic statement for this circuit?','(P^Q)v(P^_Q)v(_P^_Q)',"fig_circ",'(P^Q)v(P^_Q)v(_P^_Q)'],
                        ['What is the propositional logic statement for this circuit?','(P^Q)v(P^_Q)v(_P^Q)',"fig_circ",'(P^Q)v(P^_Q)v(_P^Q)'],
                        ['What is the propositional logic statement for this circuit?','(P^Q)v(P^_Q)v(_P^Q)v(_P^_Q)',"fig_circ",'(P^Q)v(P^_Q)v(_P^Q)v(_P^_Q)']

                          ],

                    'bo':[# Compare BigO Noation
                        ['Which is better: O(1) or O(logn)', 'O(1)', "fig_venn3", 'nofig'],
                        ['Which is better: O(1) or O(n)', 'O(1)', "fig_venn3", 'nofig'],
                        ['Which is better: O(1) or O(nlogn)', 'O(1)', "fig_venn3", 'nofig'],
                        ['Which is better: O(1) or O(n^2)', 'O(1)', "fig_venn3", 'nofig'],
                        ['Which is better: O(1) or O(n^3)', 'O(1)', "fig_venn3", 'nofig'],
                        ['Which is better: O(1) or O(2^n)', 'O(1)', "fig_venn3", 'nofig'],

                        ['Which is better: O(logn) or O(1)', 'O(1)', "fig_venn3", 'nofig'],
                        ['Which is better: O(logn) or O(n)', 'O(logn)', "fig_venn3", 'nofig'],
                        ['Which is better: O(logn) or O(nlogn)', 'O(logn)', "fig_venn3", 'nofig'],
                        ['Which is better: O(logn) or O(n^2)', 'O(logn)', "fig_venn3", 'nofig'],
                        ['Which is better: O(logn) or O(n^3)', 'O(logn)', "fig_venn3", 'nofig'],
                        ['Which is better: O(logn) or O(2^n)', 'O(logn)', "fig_venn3", 'nofig'],
                        ['Which is better: O(logn) or O(n!)', 'O(logn)', "fig_venn3", 'nofig'],

                        ['Which is better: O(n) or O(1)', 'O(1)', "fig_venn3", 'nofig'],
                        ['Which is better: O(n) or O(logn)', 'O(logn)', "fig_venn3", 'nofig'],
                        ['Which is better: O(n) or O(nlogn)', 'O(n)', "fig_venn3", 'nofig'],
                        ['Which is better: O(n) or O(n^2)', 'O(n)', "fig_venn3", 'nofig'],
                        ['Which is better: O(n) or O(n^3)', 'O(n)', "fig_venn3", 'nofig'],
                        ['Which is better: O(n) or O(2^n)', 'O(n)', "fig_venn3", 'nofig'],
                        ['Which is better: O(n) or O(n!)', 'O(n)', "fig_venn3", 'nofig'],

                        ['Which is better: O(nlogn) or O(1)', 'O(1)', "fig_venn3", 'nofig'],
                        ['Which is better: O(nlogn) or O(logn)', 'O(logn)', "fig_venn3", 'nofig'],
                        ['Which is better: O(nlogn) or O(n)', 'O(n)', "fig_venn3", 'nofig'],
                        ['Which is better: O(nlogn) or O(n^2)', 'O(nlogn)', "fig_venn3", 'nofig'],
                        ['Which is better: O(nlogn) or O(n^3)', 'O(nlogn)', "fig_venn3", 'nofig'],
                        ['Which is better: O(nlogn) or O(2^n)', 'O(nlogn)', "fig_venn3", 'nofig'],
                        ['Which is better: O(nlogn) or O(n!)', 'O(nlogn)', "fig_venn3", 'nofig'],

                        ['Which is better: O(n^2) or O(1)', 'O(1)', "fig_venn3", 'nofig'],
                        ['Which is better: O(n^2) or O(logn)', 'O(logn)', "fig_venn3", 'nofig'],
                        ['Which is better: O(n^2) or O(n)', 'O(n)', "fig_venn3", 'nofig'],
                        ['Which is better: O(n^2) or O(nlogn)', 'O(nlogn)', "fig_venn3", 'nofig'],
                        ['Which is better: O(n^2) or O(n^3)', 'O(n^2)', "fig_venn3", 'nofig'],
                        ['Which is better: O(n^2) or O(2^n)', 'O(n^2)', "fig_venn3", 'nofig'],
                        ['Which is better: O(n^2) or O(n!)', 'O(n^2)', "fig_venn3", 'nofig'],

                        ['Which is better: O(n^3) or O(1)', 'O(1)', "fig_venn3", 'nofig'],
                        ['Which is better: O(n^3) or O(logn)', 'O(logn)', "fig_venn3", 'nofig'],
                        ['Which is better: O(n^3) or O(n)', 'O(n)', "fig_venn3", 'nofig'],
                        ['Which is better: O(n^3) or O(nlogn)', 'O(nlogn)', "fig_venn3", 'nofig'],
                        ['Which is better: O(n^3) or O(n^2)', 'O(n^2)', "fig_venn3", 'nofig'],
                        ['Which is better: O(n^3) or O(2^n)', 'O(n^3)', "fig_venn3", 'nofig'],
                        ['Which is better: O(n^3) or O(n!)', 'O(n^3)', "fig_venn3", 'nofig'],

                        ['Which is better: O(2^n) or O(1)', 'O(1)', "fig_venn3", 'nofig'],
                        ['Which is better: O(2^n) or O(logn)', 'O(logn)', "fig_venn3", 'nofig'],
                        ['Which is better: O(2^n) or O(n)', 'O(n)', "fig_venn3", 'nofig'],
                        ['Which is better: O(2^n) or O(nlogn)', 'O(nlogn)', "fig_venn3", 'nofig'],
                        ['Which is better: O(2^n) or O(n^2)', 'O(n^2)', "fig_venn3", 'nofig'],
                        ['Which is better: O(2^n) or O(n^3)', 'O(n^3)', "fig_venn3", 'nofig'],
                        ['Which is better: O(2^n) or O(n!)', 'O(2^n)', "fig_venn3", 'nofig']
                          ],

                    'at':[# Analyze Tables
                        ['What are the next three outputs based on the table?','[-4,-4,-4]',"fig_table",'[[0,5,1],[-4]]'],
                        ['What is the equation f(n) for the number of operations?','f(n)=-4',"fig_table",'[[0,5,1],[-4]]'],
                        ['What is the Big O Notation for this table?','O(1)',"fig_table",'[[0,5,1],[-4]]'],

                        ['What are the next three outputs based on the table?','[9,9,9]',"fig_table",'[[0,5,1],[9]]'],
                        ['What is the equation f(n) for the number of operations?','f(n)=9',"fig_table",'[[0,5,1],[9]]'],
                        ['What is the Big O Notation for this table?','O(1)',"fig_table",'[[0,5,1],[9]]'],

                        ['What are the next three outputs based on the table?','[64,64,64]',"fig_table",'[[0,5,1],[64]]'],
                        ['What is the equation f(n) for the number of operations?','f(n)=64',"fig_table",'[[0,5,1],[64]]'],
                        ['What is the Big O Notation for this table?','O(1)',"fig_table",'[[0,5,1],[64]]'],

                        ['What are the next three outputs based on the table?','[-2,-2,-2]',"fig_table",'[[0,5,1],[-2]]'],
                        ['What is the equation f(n) for the number of operations?','f(n)=-2',"fig_table",'[[0,5,1],[-2]]'],
                        ['What is the Big O Notation for this table?','O(1)',"fig_table",'[[0,5,1],[-2]]'],

                        ['What are the next three outputs based on the table?','[6,7,8]',"fig_table",'[[0,5,1],[1,1]]'],
                        ['What is the equation f(n) for the number of operations?','f(n)=n+1',"fig_table",'[[0,5,1],[1,1]]'],
                        ['What is the Big O Notation for this table?','O(n)',"fig_table",'[[0,5,1],[1,1]]'],

                        ['What are the next three outputs based on the table?','[4,5,6]',"fig_table",'[[0,5,1],[1,-1]]'],
                        ['What is the equation f(n) for the number of operations?','f(n)=n-1',"fig_table",'[[0,5,1],[1,-1]]'],
                        ['What is the Big O Notation for this table?','O(n)',"fig_table",'[[0,5,1],[1,-1]]'],

                        ['What are the next three outputs based on the table?','[11,13,15]',"fig_table",'[[0,5,1],[2,1]]'],
                        ['What is the equation f(n) for the number of operations?','f(n)=2n+1',"fig_table",'[[0,5,1],[2,1]]'],
                        ['What is the Big O Notation for this table?','O(n)',"fig_table",'[[0,5,1],[2,1]]'],

                        ['What are the next three outputs based on the table?','[9,11,13]',"fig_table",'[[0,5,1],[2,-1]]'],
                        ['What is the equation f(n) for the number of operations?','f(n)=2n-1',"fig_table",'[[0,5,1],[2,-1]]'],
                        ['What is the Big O Notation for this table?','O(n)',"fig_table",'[[0,5,1],[2,-1]]'],

                        ['What are the next three outputs based on the table?','[-9,-11,-13]',"fig_table",'[[0,5,1],[-2,1]]'],
                        ['What is the equation f(n) for the number of operations?','f(n)=-2n+1',"fig_table",'[[0,5,1],[-2,1]]'],
                        ['What is the Big O Notation for this table?','O(n)',"fig_table",'[[0,5,1],[-2,1]]'],

                        ['What are the next three outputs based on the table?','[-11,-13,-15]',"fig_table",'[[0,5,1],[-2,-1]]'],
                        ['What is the equation f(n) for the number of operations?','f(n)=-2n-1',"fig_table",'[[0,5,1],[-2,-1]]'],
                        ['What is the Big O Notation for this table?','O(n)',"fig_table",'[[0,5,1],[-2,-1]]'],

                        ['What are the next three outputs based on the table?','[36,49,64]',"fig_table",'[[0,5,1],[1,2,1]]'],
                        ['What is the equation f(n) for the number of operations?','f(n)=n^2+2n+1',"fig_table",'[[0,5,1],[1,2,1]]'],
                        ['What is the Big O Notation for this table?','O(n^2)',"fig_table",'[[0,5,1],[1,2,1]]'],

                        ['What are the next three outputs based on the table?','[34,47,62]',"fig_table",'[[0,5,1],[1,2,-1]]'],
                        ['What is the equation f(n) for the number of operations?','f(n)=n^2+2n-1',"fig_table",'[[0,5,1],[1,2,-1]]'],
                        ['What is the Big O Notation for this table?','O(n^2)',"fig_table",'[[0,5,1],[1,2,-1]]'],

                        ['What are the next three outputs based on the table?','[16,25,36]',"fig_table",'[[0,5,1],[1,-2,1]]'],
                        ['What is the equation f(n) for the number of operations?','f(n)=n^2-2n+1',"fig_table",'[[0,5,1],[1,-2,1]]'],
                        ['What is the Big O Notation for this table?','O(n^2)',"fig_table",'[[0,5,1],[1,-2,1]]'],

                        ['What are the next three outputs based on the table?','[14,23,34]',"fig_table",'[[0,5,1],[1,-2,-1]]'],
                        ['What is the equation f(n) for the number of operations?','f(n)=n^2-2n-1',"fig_table",'[[0,5,1],[1,-2,-1]]'],
                        ['What is the Big O Notation for this table?','O(n^2)',"fig_table",'[[0,5,1],[1,-2,-1]]'],

                        ['What are the next three outputs based on the table?','[-14,-23,-34]',"fig_table",'[[0,5,1],[-1,2,1]]'],
                        ['What is the equation f(n) for the number of operations?','f(n)=-n^2+2n+1',"fig_table",'[[0,5,1],[-1,2,1]]'],
                        ['What is the Big O Notation for this table?','O(n^2)',"fig_table",'[[0,5,1],[-1,2,1]]'],

                        ['What are the next three outputs based on the table?','[-16,-25,-36]',"fig_table",'[[0,5,1],[-1,2,-1]]'],
                        ['What is the equation f(n) for the number of operations?','f(n)=-n^2+2n-1',"fig_table",'[[0,5,1],[-1,2,-1]]'],
                        ['What is the Big O Notation for this table?','O(n^2)',"fig_table",'[[0,5,1],[-1,2,-1]]'],

                        ['What are the next three outputs based on the table?','[-34,-47,-62]',"fig_table",'[[0,5,1],[-1,-2,1]]'],
                        ['What is the equation f(n) for the number of operations?','f(n)=-n^2-2n+1',"fig_table",'[[0,5,1],[-1,-2,1]]'],
                        ['What is the Big O Notation for this table?','O(n^2)',"fig_table",'[[0,5,1],[-1,-2,1]]'],

                        ['What are the next three outputs based on the table?','[-36,-49,-64]',"fig_table",'[[0,5,1],[-1,-2,-1]]'],
                        ['What is the equation f(n) for the number of operations?','f(n)=-n^2-2n-1',"fig_table",'[[0,5,1],[-1,-2,-1]]'],
                        ['What is the Big O Notation for this table?','O(n^2)',"fig_table",'[[0,5,1],[-1,-2,-1]]']
                    ],

                    'per':[# Permutations

                        ['What is P(0,0) without repetition?','1',"fig_venn3",'nofig'],
                        ['What is P(1,0) without repetition?','1',"fig_venn3",'nofig'],
                        ['What is P(1,1) without repetition?','1',"fig_venn3",'nofig'],
                        ['What is P(2,0) without repetition?','1',"fig_venn3",'nofig'],
                        ['What is P(2,1) without repetition?','2',"fig_venn3",'nofig'],
                        ['What is P(2,2) without repetition?','2',"fig_venn3",'nofig'],
                        ['What is P(3,0) without repetition?','1',"fig_venn3",'nofig'],
                        ['What is P(3,1) without repetition?','3',"fig_venn3",'nofig'],
                        ['What is P(3,2) without repetition?','6',"fig_venn3",'nofig'],
                        ['What is P(3,3) without repetition?','6',"fig_venn3",'nofig'],
                        ['What is P(4,0) without repetition?','1',"fig_venn3",'nofig'],
                        ['What is P(4,1) without repetition?','4',"fig_venn3",'nofig'],
                        ['What is P(4,2) without repetition?','12',"fig_venn3",'nofig'],
                        ['What is P(4,3) without repetition?','24',"fig_venn3",'nofig'],
                        ['What is P(4,4) without repetition?','24',"fig_venn3",'nofig'],
                        ['What is P(5,0) without repetition?','1',"fig_venn3",'nofig'],
                        ['What is P(5,1) without repetition?','5',"fig_venn3",'nofig'],
                        ['What is P(5,2) without repetition?','20',"fig_venn3",'nofig'],
                        ['What is P(5,3) without repetition?','60',"fig_venn3",'nofig'],
                        ['What is P(5,4) without repetition?','120',"fig_venn3",'nofig'],
                        ['What is P(5,5) without repetition?','120',"fig_venn3",'nofig'],

                        ['What is P(0,0)?','1',"fig_venn3",'nofig'],
                        ['What is P(1,0)?','1',"fig_venn3",'nofig'],
                        ['What is P(1,1)?','1',"fig_venn3",'nofig'],
                        ['What is P(2,0)?','1',"fig_venn3",'nofig'],
                        ['What is P(2,1)?','2',"fig_venn3",'nofig'],
                        ['What is P(2,2)?','2',"fig_venn3",'nofig'],
                        ['What is P(3,0)?','1',"fig_venn3",'nofig'],
                        ['What is P(3,1)?','3',"fig_venn3",'nofig'],
                        ['What is P(3,2)?','6',"fig_venn3",'nofig'],
                        ['What is P(3,3)?','6',"fig_venn3",'nofig'],
                        ['What is P(4,0)?','1',"fig_venn3",'nofig'],
                        ['What is P(4,1)?','4',"fig_venn3",'nofig'],
                        ['What is P(4,2)?','12',"fig_venn3",'nofig'],
                        ['What is P(4,3)?','24',"fig_venn3",'nofig'],
                        ['What is P(4,4)?','24',"fig_venn3",'nofig'],
                        ['What is P(5,0)?','1',"fig_venn3",'nofig'],
                        ['What is P(5,1)?','5',"fig_venn3",'nofig'],
                        ['What is P(5,2)?','20',"fig_venn3",'nofig'],
                        ['What is P(5,3)?','60',"fig_venn3",'nofig'],
                        ['What is P(5,4)?','120',"fig_venn3",'nofig'],
                        ['What is P(5,5)?','120',"fig_venn3",'nofig'],

                        ['What is P(0,0) with repetition?','1',"fig_venn3",'nofig'],
                        ['What is P(1,0) with repetition?','1',"fig_venn3",'nofig'],
                        ['What is P(1,1) with repetition?','1',"fig_venn3",'nofig'],
                        ['What is P(2,0) with repetition?','1',"fig_venn3",'nofig'],
                        ['What is P(2,1) with repetition?','2',"fig_venn3",'nofig'],
                        ['What is P(2,2) with repetition?','4',"fig_venn3",'nofig'],
                        ['What is P(3,0) with repetition?','1',"fig_venn3",'nofig'],
                        ['What is P(3,1) with repetition?','3',"fig_venn3",'nofig'],
                        ['What is P(3,2) with repetition?','9',"fig_venn3",'nofig'],
                        ['What is P(3,3) with repetition?','27',"fig_venn3",'nofig'],
                        ['What is P(4,0) with repetition?','1',"fig_venn3",'nofig'],
                        ['What is P(4,1) with repetition?','4',"fig_venn3",'nofig'],
                        ['What is P(4,2) with repetition?','16',"fig_venn3",'nofig'],
                        ['What is P(4,3) with repetition?','64',"fig_venn3",'nofig'],
                        ['What is P(4,4) with repetition?','256',"fig_venn3",'nofig'],
                        ['What is P(5,0) with repetition?','1',"fig_venn3",'nofig'],
                        ['What is P(5,1) with repetition?','5',"fig_venn3",'nofig'],
                        ['What is P(5,2) with repetition?','25',"fig_venn3",'nofig'],
                        ['What is P(5,3) with repetition?','125',"fig_venn3",'nofig'],
                        ['What is P(5,4) with repetition?','625',"fig_venn3",'nofig'],
                        ['What is P(5,5) with repetition?','3125',"fig_venn3",'nofig']

                           ],
                    'com':[# Combinations

                        ['What is C(0,0) without repetition?','1',"fig_venn3",'nofig'],
                        ['What is C(1,0) without repetition?','1',"fig_venn3",'nofig'],
                        ['What is C(1,1) without repetition?','1',"fig_venn3",'nofig'],
                        ['What is C(2,0) without repetition?','1',"fig_venn3",'nofig'],
                        ['What is C(2,1) without repetition?','2',"fig_venn3",'nofig'],
                        ['What is C(2,2) without repetition?','1',"fig_venn3",'nofig'],
                        ['What is C(3,0) without repetition?','1',"fig_venn3",'nofig'],
                        ['What is C(3,1) without repetition?','3',"fig_venn3",'nofig'],
                        ['What is C(3,2) without repetition?','3',"fig_venn3",'nofig'],
                        ['What is C(3,3) without repetition?','1',"fig_venn3",'nofig'],
                        ['What is C(4,0) without repetition?','1',"fig_venn3",'nofig'],
                        ['What is C(4,1) without repetition?','4',"fig_venn3",'nofig'],
                        ['What is C(4,2) without repetition?','6',"fig_venn3",'nofig'],
                        ['What is C(4,3) without repetition?','4',"fig_venn3",'nofig'],
                        ['What is C(4,4) without repetition?','1',"fig_venn3",'nofig'],
                        ['What is C(5,0) without repetition?','1',"fig_venn3",'nofig'],
                        ['What is C(5,1) without repetition?','5',"fig_venn3",'nofig'],
                        ['What is C(5,2) without repetition?','10',"fig_venn3",'nofig'],
                        ['What is C(5,3) without repetition?','10',"fig_venn3",'nofig'],
                        ['What is C(5,4) without repetition?','5',"fig_venn3",'nofig'],
                        ['What is C(5,5) without repetition?','1',"fig_venn3",'nofig'],

                        ['What is C(0,0)?','1',"fig_venn3",'nofig'],
                        ['What is C(1,0)?','1',"fig_venn3",'nofig'],
                        ['What is C(1,1)?','1',"fig_venn3",'nofig'],
                        ['What is C(2,0)?','1',"fig_venn3",'nofig'],
                        ['What is C(2,1)?','2',"fig_venn3",'nofig'],
                        ['What is C(2,2)?','1',"fig_venn3",'nofig'],
                        ['What is C(3,0)?','1',"fig_venn3",'nofig'],
                        ['What is C(3,1)?','3',"fig_venn3",'nofig'],
                        ['What is C(3,2)?','3',"fig_venn3",'nofig'],
                        ['What is C(3,3)?','1',"fig_venn3",'nofig'],
                        ['What is C(4,0)?','1',"fig_venn3",'nofig'],
                        ['What is C(4,1)?','4',"fig_venn3",'nofig'],
                        ['What is C(4,2)?','6',"fig_venn3",'nofig'],
                        ['What is C(4,3)?','4',"fig_venn3",'nofig'],
                        ['What is C(4,4)?','1',"fig_venn3",'nofig'],
                        ['What is C(5,0)?','1',"fig_venn3",'nofig'],
                        ['What is C(5,1)?','5',"fig_venn3",'nofig'],
                        ['What is C(5,2)?','10',"fig_venn3",'nofig'],
                        ['What is C(5,3)?','10',"fig_venn3",'nofig'],
                        ['What is C(5,4)?','5',"fig_venn3",'nofig'],
                        ['What is C(5,5)?','1',"fig_venn3",'nofig'],

                        ['What is C(0,0) with repetition?','1',"fig_venn3",'nofig'],
                        ['What is C(1,0) with repetition?','1',"fig_venn3",'nofig'],
                        ['What is C(1,1) with repetition?','1',"fig_venn3",'nofig'],
                        ['What is C(2,0) with repetition?','1',"fig_venn3",'nofig'],
                        ['What is C(2,1) with repetition?','2',"fig_venn3",'nofig'],
                        ['What is C(2,2) with repetition?','3',"fig_venn3",'nofig'],
                        ['What is C(3,0) with repetition?','1',"fig_venn3",'nofig'],
                        ['What is C(3,1) with repetition?','3',"fig_venn3",'nofig'],
                        ['What is C(3,2) with repetition?','6',"fig_venn3",'nofig'],
                        ['What is C(3,3) with repetition?','10',"fig_venn3",'nofig'],
                        ['What is C(4,0) with repetition?','1',"fig_venn3",'nofig'],
                        ['What is C(4,1) with repetition?','4',"fig_venn3",'nofig'],
                        ['What is C(4,2) with repetition?','10',"fig_venn3",'nofig'],
                        ['What is C(4,3) with repetition?','20',"fig_venn3",'nofig'],
                        ['What is C(4,4) with repetition?','35',"fig_venn3",'nofig'],
                        ['What is C(5,0) with repetition?','1',"fig_venn3",'nofig'],
                        ['What is C(5,1) with repetition?','5',"fig_venn3",'nofig'],
                        ['What is C(5,2) with repetition?','15',"fig_venn3",'nofig'],
                        ['What is C(5,3) with repetition?','35',"fig_venn3",'nofig'],
                        ['What is C(5,4) with repetition?','70',"fig_venn3",'nofig'],
                        ['What is C(5,5) with repetition?','126',"fig_venn3",'nofig']

                           ],

                    'pcf':[# Permutations and Combinations Facts

                        ['Does order matter for P(n,r)? yes/no','yes',"fig_venn3",'nofig'],
                        ['Does order matter for permutations? yes/no','yes',"fig_venn3",'nofig'],
                        ['Does order matter for C(n,r)? yes/no','no',"fig_venn3",'nofig'],
                        ['Does order matter for combinations? yes/no','no',"fig_venn3",'nofig'],
                        ['What is the equation for permutaions with repeats?','P(n,r)=n^r',"fig_venn3",'nofig'],
                        ['What is the equation for permutaions without repeats?','P(n,r)=(n!)/(n-r)!',"fig_venn3",'nofig'],
                        ['What is the equation for combinations with repeats?','C(n,r)=(r+n-1)!/((n-1)!*r!)',"fig_venn3",'nofig'],
                        ['What is the equation for combinations without repeats?','C(n,r)=(n!)/((n-r)!*r!)',"fig_venn3",'nofig'],

                        ['Suppose a procedure can be brokenn down into a sequence of two tasks. If there are n1 ways to do the first task and for each of these ways of doing the first task, there are n2 ways to do the second task, then there are n1*n2 ways to do the procedure. Select the Rule: product, sum, subtraction, or division:','product',"fig_venn3",'nofig'],
                        ['If a task can be done either in one of n1 ways or in one of n2 ways, where none of the set of n1 ways is the same as any of the set of n2 ways, then there are n1 + n2 ways to do the task. Select the Rule: product, sum, subtraction, or division:','product',"fig_venn3",'nofig'],
                        ['If a task can be done in either n1 ways or n2 ways, then the number of ways to do the task is n1 + n2 minus the number of ways to do the task that are common to the two different ways. Select the Rule: product, sum, subtraction, or division:','product',"fig_venn3",'nofig'],
                        ['There are n/d ways to do a task if it can be done using a procedure that can be carried out in n ways, and for every way w, exactly d of the n wys correspond to way w. Select the Rule: product, sum, subtraction, or division:','product',"fig_venn3",'nofig'],

                        ['Given only P(n,r), are repeats assumed? T/F','F',"fig_venn3",'nofig'],
                        ['Given only P(n,r), are no repeats assumed? T/F','T',"fig_venn3",'nofig'],
                        ['Given only C(n,r), are repeats assumed? T/F','F',"fig_venn3",'nofig'],
                        ['Given only C(n,r), are no repeats assumed? T/F','T',"fig_venn3",'nofig'],
                        ['Given only P(4,3), are repeats assumed? T/F','F',"fig_venn3",'nofig'],
                        ['Given only P(4,3), are no repeats assumed? T/F','T',"fig_venn3",'nofig'],
                        ['Given only C(4,3), are repeats assumed? T/F','F',"fig_venn3",'nofig'],
                        ['Given only C(4,3), are no repeats assumed? T/F','T',"fig_venn3",'nofig'],

                        ['P(n,r) >  C(n,r) Select: T/F','F',"fig_venn3",'nofig'],
                        ['P(n,r) >= C(n,r) Select: T/F','T',"fig_venn3",'nofig'],
                        ['P(n,r) <  C(n,r) Select: T/F','F',"fig_venn3",'nofig'],
                        ['P(n,r) <= C(n,r) Select: T/F','F',"fig_venn3",'nofig'],
                        ['C(n,r) >  P(n,r) Select: T/F','F',"fig_venn3",'nofig'],
                        ['C(n,r) >= P(n,r) Select: T/F','T',"fig_venn3",'nofig'],
                        ['C(n,r) <  P(n,r) Select: T/F','F',"fig_venn3",'nofig'],
                        ['C(n,r) <= P(n,r) Select: T/F','T',"fig_venn3",'nofig'],
                        ['P(5,3) >  C(5,3) Select: T/F','T',"fig_venn3",'nofig'],
                        ['P(5,3) >= C(5,3) Select: T/F','F',"fig_venn3",'nofig'],
                        ['P(5,3) <  C(5,3) Select: T/F','F',"fig_venn3",'nofig'],
                        ['P(5,3) <= C(5,3) Select: T/F','F',"fig_venn3",'nofig'],
                        ['C(5,3) >  P(5,3) Select: T/F','T',"fig_venn3",'nofig'],
                        ['C(5,3) >= P(5,3) Select: T/F','F',"fig_venn3",'nofig'],
                        ['C(5,3) <  P(5,3) Select: T/F','T',"fig_venn3",'nofig'],
                        ['C(5,3) <= P(5,3) Select: T/F','F',"fig_venn3",'nofig'],

                        ['what is the relationship between P(n,r) without repetition using cobinations and permutations?','P(n,r)=C(n,r)*P(r,r)',"fig_venn3",'nofig'],
                        ['what is the relationship between P(2,1) without repetition using cobinations and permutations?','P(2,1)=C(2,1)*P(1,1)',"fig_venn3",'nofig'],
                        ['what is the relationship between P(2,2) using cobinations and permutations?','P(2,2)=C(2,2)*P(2,2)',"fig_venn3",'nofig'],
                        ['what is the relationship between P(3,1) without repetition using cobinations and permutations?','P(3,1)=C(3,1)*P(1,1)',"fig_venn3",'nofig'],
                        ['what is the relationship between P(3,2) using cobinations and permutations?','P(3,2)=C(3,2)*P(2,2)',"fig_venn3",'nofig'],
                        ['what is the relationship between P(3,3) without repetition using cobinations and permutations?','P(3,3)=C(3,3)*P(3,3)',"fig_venn3",'nofig'],
                        ['what is the relationship between P(4,1) using cobinations and permutations?','P(4,1)=C(4,1)*P(1,1)',"fig_venn3",'nofig'],
                        ['what is the relationship between P(4.2) without repetition using cobinations and permutations?','P(4,2)=C(4,2)*P(2,2)',"fig_venn3",'nofig'],
                        ['what is the relationship between P(4,3) using cobinations and permutations?','P(4,3)=C(4,3)*P(3,3)',"fig_venn3",'nofig'],
                        ['what is the relationship between P(4,4) without repetition using cobinations and permutations?','P(4,4)=C(4,4)*P(4,4)',"fig_venn3",'nofig'],
                        ['what is the relationship between P(5,1) using cobinations and permutations?','P(5,1)=C(5,1)*P(1,1)',"fig_venn3",'nofig'],
                        ['what is the relationship between P(5,2) without repetition using cobinations and permutations?','P(5,2)=C(5,2)*P(2,2)',"fig_venn3",'nofig'],
                        ['what is the relationship between P(5,3) using cobinations and permutations?','P(5,3)=C(5,3)*P(3,3)',"fig_venn3",'nofig'],
                        ['what is the relationship between P(5,4) without repetition using cobinations and permutations?','P(5,4)=C(5,4)*P(4,4)',"fig_venn3",'nofig'],
                        ['what is the relationship between P(5,5) using cobinations and permutations?','P(5,5)=C(5,5)*P(5,5)',"fig_venn3",'nofig'],

                        ['what is the relationship between C(n,r) without repetition using permutations only?','C(n,r)=P(n,r)/P(r,r)',"fig_venn3",'nofig'],
                        ['what is the relationship between C(2,1)  using permutations only?','C(2,1)=P(2,1)/P(1,1)',"fig_venn3",'nofig'],
                        ['what is the relationship between C(2,2) without repetition using permutations only?','C(2,2)=P(2,2)/P(2,2)',"fig_venn3",'nofig'],
                        ['what is the relationship between C(3,1)  using permutations only?','C(3,1)=P(3,1)/P(1,1)',"fig_venn3",'nofig'],
                        ['what is the relationship between C(3,2) without repetition using permutations only?','C(3,2)=P(3,2)/P(2,2)',"fig_venn3",'nofig'],
                        ['what is the relationship between C(3,3)  using permutations only?','C(3,3)=P(3,3)/P(3,3)',"fig_venn3",'nofig'],
                        ['what is the relationship between C(4,1) without repetition using permutations only?','C(4,1)=P(4,1)/P(1,1)',"fig_venn3",'nofig'],
                        ['what is the relationship between C(4.2)  using permutations only?','C(4,2)=P(4,2)/P(2,2)',"fig_venn3",'nofig'],
                        ['what is the relationship between C(4,3) without repetition using permutations only?','C(4,3)=P(4,3)/P(3,3)',"fig_venn3",'nofig'],
                        ['what is the relationship between C(4,4)  using permutations only?','C(4,4)=P(4,4)/P(4,4)',"fig_venn3",'nofig'],
                        ['what is the relationship between C(5,1) without repetition using permutations only?','C(5,1)=P(5,1)/P(1,1)',"fig_venn3",'nofig'],
                        ['what is the relationship between C(5,2)  using permutations only?','C(5,2)=P(5,2)/P(2,2)',"fig_venn3",'nofig'],
                        ['what is the relationship between C(5,3) without repetition using permutations only?','C(5,3)=P(5,3)/P(3,3)',"fig_venn3",'nofig'],
                        ['what is the relationship between C(5,4)  using permutations only?','C(5,4)=P(5,4)/P(4,4)',"fig_venn3",'nofig'],
                        ['what is the relationship between C(5,5) without repetition using permutations only?','C(5,5)=P(5,5)/P(5,5)',"fig_venn3",'nofig'],

                        ['what is the equation for P(2,1) without repetition?','P(2,1)=(2!)/(2-1)!',"fig_venn3",'nofig'],
                        ['what is the equation for P(2,2)?','P(2,2)=(2!)/(2-2)!',"fig_venn3",'nofig'],
                        ['what is the equation for P(3,1) without repetition?','P(3,1)=(3!)/(3-1)!',"fig_venn3",'nofig'],
                        ['what is the equation for P(3,2)?','P(3,2)=(3!)/(3-2)!',"fig_venn3",'nofig'],
                        ['what is the equation for P(3,3) without repetition?','P(3,3)=(3!)/(3-3)!',"fig_venn3",'nofig'],
                        ['what is the equation for P(4,1)?','P(4,1)=(4!)/(4-1)!',"fig_venn3",'nofig'],
                        ['what is the equation for P(4.2) without repetition?','P(4,2)=(4!)/(4-2)!',"fig_venn3",'nofig'],
                        ['what is the equation for P(4,3)?','P(4,3)=(4!)/(4-3)!',"fig_venn3",'nofig'],
                        ['what is the equation for P(4,4) without repetition?','P(4,4)=(4!)/(4-4)!',"fig_venn3",'nofig'],
                        ['what is the equation for P(5,1)?','P(5,1)=(5!)/(5-1)!',"fig_venn3",'nofig'],
                        ['what is the equation for P(5,2) without repetition?','P(5,2)=(5!)/(5-2)!',"fig_venn3",'nofig'],
                        ['what is the equation for P(5,3)?','P(5,3)=(5!)/(5-3)!',"fig_venn3",'nofig'],
                        ['what is the equation for P(5,4) without repetition?','P(5,4)=(5!)/(5-4)!',"fig_venn3",'nofig'],
                        ['what is the equation for P(5,5)?','P(5,5)=(5!)/(5-5)!',"fig_venn3",'nofig'],

                        ['what is the equation for C(2,1)?','C(2,1)=(2!)/((2-1)!*1!)',"fig_venn3",'nofig'],
                        ['what is the equation for C(2,2) without repetition?','C(2,2)=(2!)/((2-2)!*2!)',"fig_venn3",'nofig'],
                        ['what is the equation for C(3,1)?','C(3,1)=(3!)/((3-1)!*1!)',"fig_venn3",'nofig'],
                        ['what is the equation for C(3,2) without repetition?','C(3,2)=(3!)/((3-2)!*2!)',"fig_venn3",'nofig'],
                        ['what is the equation for C(3,3)?','C(3,3)=(3!)/((3-3)!*3!)',"fig_venn3",'nofig'],
                        ['what is the equation for C(4,1) without repetition?','C(4,1)=(4!)/((4-1)!*1!)',"fig_venn3",'nofig'],
                        ['what is the equation for C(4.2)?','C(4,2)=(4!)/((4-2)!*2!)',"fig_venn3",'nofig'],
                        ['what is the equation for C(4,3) without repetition?','C(4,3)=(4!)/((4-3)!*3!)',"fig_venn3",'nofig'],
                        ['what is the equation for C(4,4)?','C(4,4)=(4!)/((4-4)!*4!)',"fig_venn3",'nofig'],
                        ['what is the equation for C(5,1) without repetition?','C(5,1)=(5!)/((5-1)!*1!)',"fig_venn3",'nofig'],
                        ['what is the equation for C(5,2)?','C(5,2)=(5!)/((5-2)!*2!)',"fig_venn3",'nofig'],
                        ['what is the equation for C(5,3) without repetition?','C(5,3)=(5!)/((5-3)!*3!)',"fig_venn3",'nofig'],
                        ['what is the equation for C(5,4)?','C(5,4)=(5!)/((5-4)!*4!)',"fig_venn3",'nofig'],
                        ['what is the equation for C(5,5) without repetition?','C(5,5)=(5!)/((5-5)!*5!)',"fig_venn3",'nofig']
                           ],
                    'cwp':[# Counting Word Problems for Permutations and Combinations



                           ]

                    }






#convert to JSON
structuredData = []
for topic, questions in questions_dict.items():
    for id, questionData in enumerate(questions):
        structuredData.append({
            "topic": topic,
            "ID": id + 1,
            "question": questionData[0],
            "solution": questionData[1],
            "figure": questionData[2],
            "answerFigure": questionData[3],
        })


file_path = os.path.join(os.getcwd(), 'public/questions.json')

jsonData = json.dumps(structuredData, indent=4)

with open(file_path, "w") as file:
    file.write(jsonData)