from deep_translator import GoogleTranslator

neke = GoogleTranslator(source='sl', target='en').translate("avto") 
print(neke)