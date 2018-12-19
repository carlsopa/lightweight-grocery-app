from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from scrap import simple_get
from bs4 import BeautifulSoup
from urllib.request import urlopen
from time import sleep

def ListPopulate(GroLst):
  x = 0
  ItemName = driver.find_elements_by_class_name('product_title')
  SalePrice = driver.find_elements_by_class_name('offer_tag')
  while x < len(ItemName):
    GroLst.append({'Product':ItemName[x].text,'Offer':SalePrice[x].text})
    x = x+1

driver = webdriver.Chrome()
driver.get('https://www.harristeeter.com/specials/weekly-list/best-deals')
GroceryList = []
#first part of the page requires the user to enter 
# their zipcode to locate the local ad.
Select = 'Select'
elem = driver.find_element_by_name("address")
elem.send_keys("20009")
elem.send_keys(Keys.RETURN)
driver.implicitly_wait(15)
#The site then looks for the nearest Harris Teeters to your zipcode.  
# Here I choose the first one, which is my local grocery store.
btnlst = driver.find_elements_by_xpath('//a[contains(text(),"'+ Select +'")]')
btnlst[0].send_keys(Keys.RETURN)

sleep(5)
#The site uses select box to allow you to choose the different departments.  
# Here I get a list of it, to use not only as control but also to organize the products.
select = driver.find_element_by_id('departments')
selectlist = select.find_elements_by_tag_name('option')
#control structure that loops through each department
for o in selectlist:
  sleep(5)
  GroceryList.append(o.text)
  ListPopulate(GroceryList)
  #looks for a next arrow and moves forward.  
  #This arrow always exists, hence using the previous for loop as a control.
  if driver.find_element_by_class_name('next-arrow'):
    driver.find_element_by_class_name('next-arrow').click()
#run through the list and print out, primarily for debugging issues.
for x in GroceryList:
  print(x)
driver.quit()
