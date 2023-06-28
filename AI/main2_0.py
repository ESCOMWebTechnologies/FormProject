import argparse
import subprocess
import sys
import os
from concurrent.futures import ThreadPoolExecutor
from threading import Semaphore
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
try:
    import spacy
    import mysql.connector as db
    nlp = spacy.load('es_core_news_sm')
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "spacy","mysql-connector-python"])
    subprocess.check_call([sys.executable, "-m","spacy","download","es_core_news_sm"])
    import spacy
try:
    database = db.connect(host="localhost", user="admin", password="1234", database="formProject")
    cursor = database.cursor()
except:
    pass
def CheckAnswer(answer:str, id:str, semaphore:Semaphore ):
    new_doc = nlp(answer)
    similarity = [new_doc.similarity(doc[i]) for i in range(1, len(doc))]
    try:
        semaphore.acquire()
        cursor.execute("UPDATE answer SET value=%s WHERE id=%s",(max(similarity),id))
        database.commit()
    except Exception as ex:
        print(str(ex))
    finally:
        semaphore.release()
parser = argparse.ArgumentParser(description='Procesar argumentos')
parser.add_argument('question', type=str, help='La pregunta')
args = parser.parse_args()
cursor.execute("SELECT answer FROM answer WHERE value > 6")
temp = cursor.fetchall()
answers = list()
for i in temp:
    answers.append(i[0])
question = args.question
context = question + " " + " ".join(answers)
doc = nlp(context)
cursor.execute("SELECT answer, id FROM answer")
new_answers = cursor.fetchall()
semaphore = Semaphore()
with ThreadPoolExecutor() as executor:
    for answer in new_answers:
        executor.submit(CheckAnswer, answer[0], answer[1], semaphore)
database.close()