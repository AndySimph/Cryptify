import requests
import pprint as pp
import random
import json
import sys


HEADLINES_URL_ROOT = "https://newsapi.org/v2/top-headlines?"
EVERYTHING_URL_ROOT = "https://newsapi.org/v2/everything?"
API_KEY = "8ad2eea6828c4706ae51ce8008ef9652"

KEYWORD_LIST = ["bitcoin", "ethereum", "binance", "tether", "cardano"]

keyword_mentions = []

JSON_PATH = "./articles.json"


def main():
	# Get all the articles related to all the keywords
	all_articles = []

	for keyword in KEYWORD_LIST:
		# print("\nKEYWORD: {}".format(keyword))
		request_string = EVERYTHING_URL_ROOT + "language=en&q={}&apiKey={}".format(keyword, API_KEY)
		articles_request = requests.get(request_string)
		keyword_articles = articles_request.json()["articles"]
		all_articles.extend(keyword_articles)

		# keyword_mentions.append(articles_request.json()["totalResults"])

	# Get 5 random articles and store them in the json file
	selected_articles = []
	for i in range(5):
		random_article_index = random.randrange(0, len(all_articles) - 1)
		random_article = all_articles[random_article_index]
		selected_articles.append(random_article)

	pp.pprint(selected_articles)
	print("\n")

	with open(JSON_PATH, 'w') as json_file:
		json.dump(selected_articles, json_file)

	# print(KEYWORD_LIST)
	# print(keyword_mentions)

	# max_mentions_value = max(keyword_mentions)
	# index_max_keyword = keyword_mentions.index(max_mentions_value)
	# # print(KEYWORD_LIST[index_max_keyword])

	# top_five_keywords = KEYWORD_LIST

	# # Pick a random article relevant to a randomly-selected keyword among the top 5
	# random_index = random.randrange(0, len(top_five_keywords) - 1)
	# random_keyword = KEYWORD_LIST[random_index]
	# print(random_keyword)

	# request_string = EVERYTHING_URL_ROOT + "language=en&q={}&apiKey={}".format(random_keyword, API_KEY)
	# articles_request = requests.get(request_string)
	# all_articles = articles_request.json()["articles"]
	# # pp.pprint(all_articles)
	# with open(JSON_PATH, 'w') as json_file:
	# 	json.dump(all_articles, json_file)

	# random_article_index = random.randrange(0, len(all_articles) - 1)
	# random_article = all_articles[random_article_index]
	# # pp.pprint(random_article)






if __name__ == "__main__":
	main()



