# Notch

## Automation Audit — Test Suite

## 1. Smoke

| ID     | Test Case                                                 
| ------ | --------------------------------------------------------- 
| SAN-01 | Verify Automation Audit section is displayed              
| SAN-02 | Verify all 4 rule types are displayed                     
| SAN-03 | Verify email pattern rule triggers unassignment           
| SAN-04 | Verify subject rule triggers unassignment                 
| SAN-05 | Verify user message rule triggers unassignment            
| SAN-06 | Verify assistant reply rule triggers unassignment         
| SAN-07 | Verify conversation remains assigned when no rule matches 
| SAN-08 | Verify multiple rule types are evaluated together         
| SAN-09 | Verify configuration can be saved successfully            
| SAN-10 | Verify existing configuration is loaded correctly         


---

## 2. Regression

| ID     | Test Case                                                   
| ------ | ----------------------------------------------------------- 
| REG-01 | Verify Automation Audit section is displayed                
| REG-02 | Verify all 4 rule types are displayed                       
| REG-03 | Verify email pattern rule triggers unassignment             
| REG-04 | Verify subject rule triggers unassignment                   
| REG-05 | Verify user message rule triggers unassignment              
| REG-06 | Verify assistant reply rule triggers unassignment           
| REG-07 | Verify existing configuration is preserved after changes    
| REG-08 | Verify adding a new rule does not affect existing rules     
| REG-09 | Verify updating a rule does not affect other rule types     
| REG-10 | Verify deleting a rule does not affect remaining rules      
| REG-11 | Verify multiple rule types work together correctly          
| REG-12 | Verify conversations without matching rules remain assigned 

---

## 3. Feature-Specific Coverage

### 3.1 Email Patterns to Unassign

| Test Case                                                             
| --------------------------------------------------------------------- 
| Add a new email pattern                                               
| Edit an existing email pattern                                        
| Delete an existing email pattern                                      
| Save email pattern changes                                            
| Verify saved email patterns persist after page refresh                
| Verify duplicate email patterns are handled safely                    
| Verify exact email pattern match triggers unassignment                
| Verify partial email pattern match triggers unassignment              
| Verify no unassignment when no email pattern matches                  
| Verify matching is not affected by letter casing                      
| Verify spaces before or after a configured pattern are handled safely 
| Verify matching with multiple configured email patterns               
| Verify unassignment when any configured email pattern matches         
| Verify multiple matching patterns trigger only one unassignment       

---

### 3.2 Subjects

| Test Case                                                                           
| ----------------------------------------------------------------------------------- 
| Add a new subject keyword                                                           
| Edit an existing subject keyword                                                    
| Delete a subject keyword                                                            
| Save subject keyword changes                                                        
| Verify saved subject keywords persist after page refresh                            
| Verify duplicate subject keywords are handled safely                                
| Verify exact subject keyword match triggers unassignment                            
| Verify partial subject keyword match triggers unassignment                          
| Verify no unassignment when no subject keyword matches                              
| Verify matching is not affected by letter casing                                    
| Verify spaces before or after a configured keyword are handled safely               
| Verify matching with multiple configured subject keywords                           
| Verify unassignment when any configured subject keyword matches                     
| Verify multiple matching subject keywords trigger only one unassignment             
| Verify empty subject does not trigger unassignment                                  
| Verify subject keyword matching with special characters (for example: `résumé`)     

---

### 3.3 Words in User Message

| Test Case                                                                       
| ------------------------------------------------------------------------------- 
| Add a new user message keyword                                                  
| Edit an existing user message keyword                                           
| Delete a user message keyword                                                   
| Save user message keyword changes                                               
| Verify saved user message keywords persist after page refresh                   
| Verify duplicate user message keywords are handled safely                       
| Verify user message containing a configured word triggers unassignment          
| Verify no unassignment when the user message does not contain a configured word 
| Verify matching when the configured word is part of a larger message            
| Verify matching is not affected by letter casing                                
| Verify spaces before or after a configured keyword are handled safely           
| Verify matching with multiple configured user message keywords                  
| Verify unassignment when any configured user message keyword matches            
| Verify multiple matching keywords trigger only one unassignment                 
| Verify keyword appears multiple times in the same user message                  
| Verify very long user message is handled safely                                 
| Verify user message keyword matching with non-English characters                

---

### 3.4 Words in Assistant's Reply

| Test Case                                                                          
| ---------------------------------------------------------------------------------- 
| Add a new assistant reply keyword                                                  
| Edit an existing assistant reply keyword                                           
| Delete an assistant reply keyword                                                  
| Save assistant reply keyword changes                                               
| Verify saved assistant reply keywords persist after page refresh                   
| Verify duplicate assistant reply keywords are handled safely                       
| Verify assistant reply containing a configured word triggers unassignment          
| Verify no unassignment when the assistant reply does not contain a configured word 
| Verify matching when the configured word is part of a larger assistant reply       
| Verify matching is not affected by letter casing                                   
| Verify spaces before or after a configured keyword are handled safely              
| Verify matching with multiple configured assistant reply keywords                  
| Verify unassignment when any configured assistant reply keyword matches            
| Verify multiple matching keywords trigger only one unassignment                    
| Verify configured word appears multiple times in the same assistant reply          
| Verify assistant reply keyword matching with non-English characters                

---

## 4. Cross-Rule Behavior

| Test Case                                                                          
| ---------------------------------------------------------------------------------- 
| Verify unassignment when multiple different rule types match simultaneously
| Verify unassignment when all four rule types match simultaneously
| Verify multiple matches across different rule types trigger only one unassignment
| Verify no duplicate automation event is created when several rule types match
| Verify audit show the correct matching rule types when several sections match

## 5. Performance & Reliability

| Test Case                                                                          
| ---------------------------------------------------------------------------------- 
| Verify matching performance with a large number of configured values               
| Verify matching with very long user messages                                       
| Verify matching with very long assistant replies                                   
| Verify multiple conversations are processed simultaneously                         
| Verify configuration is not corrupted during repeated save actions                 
| Verify behavior when a network interruption occurs during save                     
| Verify concurrent configuration changes by multiple users                          
| Verify conversation is unassigned only once when multiple rule types match simultaneously
