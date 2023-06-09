import argparse
import subprocess
import sys
import os
from concurrent.futures import ThreadPoolExecutor, wait
from threading import Semaphore
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
try:
    import spacy
    import mysql.connector as db
    nlp = spacy.load('es_core_news_sm')
    print("LOADED")
except ImportError:
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "spacy","mysql-connector-python"])
        subprocess.check_call([sys.executable, "-m","spacy","download","es_core_news_sm"])
        import spacy
        import mysql.connector as db
        print("here2")
    except Exception as ex:
        print("here3")

        exit()
except Exception as ex:

    exit()
try:
    database = db.connect(host="localhost", user="root", password="1234", database="formProject")
    cursor = database.cursor()

except Exception as ex:
    print(str(ex))
    exit()
def CheckAnswer(answer:str, id:str, semaphore:Semaphore ):
    new_doc = nlp(answer)
    similarity = [new_doc.similarity(doc[i]) for i in range(1, len(doc))]
    try:
        semaphore.acquire()
        cursor.execute("UPDATE answer SET value=%s WHERE id=%s AND value < 90",(int(max(similarity)*100),id))
        database.commit()
    except Exception as ex:
        print(str(ex))
    finally:
        semaphore.release()
parser = argparse.ArgumentParser(description='Procesar argumentos')
parser.add_argument('--formId', type=str, help='Type the Form Id')
parser.add_argument('--questionId', type=str, help='Type the Question Id')
args = parser.parse_args()
cursor.execute("SELECT answer FROM answer WHERE value > 70 AND questionId='{0}'".format(args.questionId))
temp = cursor.fetchall()
answers = list()
for i in temp:
    answers.append(i[0])
cursor.execute("SELECT question FROM question WHERE id='{0}'".format(args.questionId))
temp = cursor.fetchall()
question = ""
for i in temp:
    question = i[0]
print(question)
context = question + " " + " ".join(answers)
doc = nlp(context)
cursor.execute("SELECT answer, id FROM answer WHERE questionId='{0}'".format(args.questionId))
new_answers = cursor.fetchall()
semaphore = Semaphore()
with ThreadPoolExecutor() as executor:

    tasks = [executor.submit(CheckAnswer, answer[0], answer[1], semaphore) for answer in new_answers]
    wait(tasks)
cursor.execute("UPDATE forms SET answerNumber='{0}' WHERE id='{1}'".format(len(answers), args.formId))
database.commit()
database.close()
print("Complete")