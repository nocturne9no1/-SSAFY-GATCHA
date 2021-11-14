import pandas as pd
import shutil
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from numpy import dot
from numpy.linalg import norm
import os
import pickle
from wordcloud import WordCloud, STOPWORDS, ImageColorGenerator
import scipy.sparse as sparse
from scipy.sparse import csr_matrix
from scipy.sparse.linalg import spsolve

DATA_DIR = os.path.dirname(os.path.abspath(__file__)) + "/data"
GAME_TAG = os.path.join(DATA_DIR, "game_tag.pkl")
TAG_LIST = os.path.join(DATA_DIR, "tag_list.pkl")
GAME_LIST = os.path.join(DATA_DIR, "game_list.pkl")
GAMES_DATAFRAMES = os.path.join(DATA_DIR, "games_dataframes.pkl")
REVIEW_DATA = os.path.join(DATA_DIR, "reviews.pkl")
WORD_CLOUD_PATH = DATA_DIR + "/../../../frontend/src/wordclouds/"
REVIEW_FOR_COLABORATIVE = os.path.join(DATA_DIR, "reviewer_least_10reviews.pkl")
MAX_GAME_COUNT = 20
GAME_CANDIDATE_COUNT = 60


def load_pickle_data(filename):
    return pd.read_pickle(filename)


def get_content_based_result(user_game_list):
    df = load_pickle_data(GAME_TAG)
    games = load_pickle_data(GAMES_DATAFRAMES)

    tags = pickle_to_list(TAG_LIST)

    temp = ["user"]
    user_df = pd.DataFrame(data=0, index=temp, columns=tags)
    for game_id in user_game_list:
        game_info = games.loc[games['id'] == game_id]
        game_tags = game_info["tags"]
        for tag in game_tags:
            user_df.loc["user", tag] = user_df.loc["user", tag] + 1
    temp2 = cosine_similarity(user_df, df)
    temp2 = temp2.reshape(-1, 1)
    games.loc[:, "similarity"] = temp2
    result = games.sort_values(by=['similarity'], axis=0, ascending=False)
    result = result[~result[['id']].isin(user_game_list).all(axis=1)]
    result = result.fillna('')
    return result.head(GAME_CANDIDATE_COUNT).sample(n=MAX_GAME_COUNT)


def get_cosine_similarity(a, b):
    return dot(a, b) / (norm(a) * norm(b))


def pickle_to_list(filename):
    with open(filename, 'rb') as f:
        data = pickle.load(f)
    return data


def list_to_pickle(data, filename):
    with open(filename, 'wb') as f:
        pickle.dump(data, f)


def get_search_list_by_game_name(target_name):
    games = load_pickle_data(GAMES_DATAFRAMES)
    result = games[games['app_name'].str.contains(target_name, case=False)]
    result = result.fillna('')
    return result


def get_user_rated_game_list(user_game_list_good, user_game_list_bad):
    games = load_pickle_data(GAMES_DATAFRAMES)
    good_list = games[games['id'].isin(user_game_list_good)]
    bad_list = games[games['id'].isin(user_game_list_bad)]
    if good_list.size != 0:
        good_list.loc[:, 'like'] = 1
    if bad_list.size != 0:
        bad_list.loc[:, 'like'] = 0
    return pd.concat([good_list, bad_list], ignore_index=True).fillna('')


def get_high_rated(user_game_list):
    games = load_pickle_data(GAMES_DATAFRAMES)
    # 리뷰 개수 200개 이상
    games = games[games['review_count'] >= 200]
    # 점수 높은 순으로
    games = games.sort_values(by=['good_rate'], axis=0, ascending=False)
    # 사용자가 이미 평가한 항목 제외
    games = games[~games['id'].isin(user_game_list)].fillna('')
    # GAME_CANDIDATE_COUNT개 중 MAX_GAME_COUNT개 반환
    return games.head(GAME_CANDIDATE_COUNT).sample(n=MAX_GAME_COUNT)


def get_many_reviewed(user_game_list):
    games = load_pickle_data(GAMES_DATAFRAMES)
    # 리뷰 개수 200개 이상
    games = games[games['review_count'] >= 200]
    # 점수 높은 순으로
    games = games.sort_values(by=['review_count'], axis=0, ascending=False)
    # 사용자가 이미 평가한 항목 제외
    games = games[~games['id'].isin(user_game_list)].fillna('')
    # GAME_CANDIDATE_COUNT개 중 MAX_GAME_COUNT개 반환
    return games.head(GAME_CANDIDATE_COUNT).sample(n=MAX_GAME_COUNT)


def get_high_play_hour_reviewed(user_game_list):
    games = load_pickle_data(GAMES_DATAFRAMES)
    # 리뷰 개수 200개 이상
    games = games[games['review_count'] >= 200]
    # 점수 높은 순으로
    games = games.sort_values(by=['play_hour'], axis=0, ascending=False)
    # 사용자가 이미 평가한 항목 제외
    games = games[~games['id'].isin(user_game_list)].fillna('')
    # GAME_CANDIDATE_COUNT개 중 MAX_GAME_COUNT개 반환
    return games.head(GAME_CANDIDATE_COUNT).sample(n=MAX_GAME_COUNT)


def get_game_info_by_gameId(game_id, user_game_list):
    games = load_pickle_data(GAMES_DATAFRAMES)
    game = games[games['id'] == game_id]
    game.loc[:, 'like'] = -1
    for item in user_game_list:
        if game_id == item['gameid']:
            if item['like'] == 1:
                game['like'] = 1
            else:
                game['like'] = 0
    return game.fillna('')


def get_game_list_by_category(category_list):
    games = load_pickle_data(GAMES_DATAFRAMES)
    df = pd.DataFrame(columns=games.columns.values)
    for category in category_list:
        lists = pickle_to_list(make_file_path(category))
        lists = pd.DataFrame(lists, columns=games.columns.values)
        lists = lists.sort_values(by=['good_rate'], axis=0, ascending=False).sample(n=MAX_GAME_COUNT)
        # df = pd.merge(df, lists)
        df = pd.concat([df, lists])
    df = df.drop_duplicates(['id'])
    df = df.fillna('')
    return df.head(GAME_CANDIDATE_COUNT).sample(n=MAX_GAME_COUNT)


def make_file_path(filename):
    return os.path.join(DATA_DIR, filename + ".pkl")


def get_word_cloud_by_game_id(game_id):
    # print(os.path.dirname(os.path.abspath(__file__)))
    # print(WORD_CLOUD_PATH + str(game_id) + ".png")
    data = pickle_to_list(REVIEW_DATA)

    game_reviews = data.loc[data['game_id'] == game_id]
    text = " ".join(str(i) for i in game_reviews["review_text"])
    # 제외할 단어
    stopwords = {'게임', '진짜', '거의', '많이'}
    # 워드 클라우드 설정
    wordcloud = WordCloud(
        font_path=DATA_DIR + "/NanumGothic.ttf",
        width=1000,
        height=250,
        background_color="#333333",
        stopwords=stopwords
    )
    keyword = wordcloud.generate(text)
    wordcloud.to_file(WORD_CLOUD_PATH + str(game_id) + ".png")


############## 협업 기반 필터링 ###################
def get_colaborative_based_result(good_list, bad_list):
    game_id_list = list()
    game_rate_list = list()
    for game_id in good_list:
        game_id_list.append(game_id)
        game_rate_list.append(1)
    for game_id in bad_list:
        game_id_list.append(game_id)
        game_rate_list.append(-1)
    game_list = list()
    game_list.append(game_id_list)
    game_list.append(game_rate_list)
    print(game_list)
    userId = "user"
    predict, game_id_list = alsAlgo(userId, game_list)
    user_rate = predict[len(predict) - 1]
    game_id_list.remove('reviewer_name')
    # print(np.round_(user_rate,2))
    new_data = pd.DataFrame([user_rate], columns=game_id_list, index=[userId], dtype=float)
    new_data = new_data.sort_values(axis=1, by=userId, ascending=False)

    item_gameId = []
    for games in game_list[0]:
        item_gameId.append(games)

    new_data = new_data.drop(columns=item_gameId)
    temp = new_data.columns.values.tolist()
    temp = temp[:20]
    temp = map(int, temp)
    print(new_data)
    games = load_pickle_data(GAMES_DATAFRAMES)
    temp2 = games['id'].isin(temp)
    colaborative_game_list = games[temp2]
    colaborative_game_list['similarity'] = np.nan
    count = 0
    for column_name, item in new_data.iteritems():
        colaborative_game_list.loc[colaborative_game_list['id'] == int(column_name), 'similarity'] = item[0]
        count = count + 1
        if count == 20:
            break
    result = colaborative_game_list.sort_values(by=['similarity'], axis=0, ascending=False).fillna('')
    return result


def nonzeros(m, row):
    for index in range(m.indptr[row], m.indptr[row + 1]):
        yield m.indices[index], m.data[index]


def least_squares_cg(Cui, X, Y, lambda_val, cg_steps=3):
    users, features = X.shape
    YtY = Y.T.dot(Y) + lambda_val * np.eye(features)
    for u in range(users):

        x = X[u]
        r = -YtY.dot(x)
        for i, confidence in nonzeros(Cui, u):
            r += (confidence - (confidence - 1) * Y[i].dot(x)) * Y[i]

        p = r.copy()
        rsold = r.dot(r)
        for it in range(cg_steps):
            Ap = YtY.dot(p)
            for i, confidence in nonzeros(Cui, u):
                Ap += (confidence - 1) * Y[i].dot(p) * Y[i]

            alpha = rsold / p.dot(Ap)
            x += alpha * p
            r -= alpha * Ap

            rsnew = r.dot(r)
            p = r + (rsnew / rsold) * p
            rsold = rsnew

        X[u] = x


def implicit_als_cg(Cui, features=20, iterations=20, lambda_val=40):
    user_size, item_size = Cui.shape

    X = np.random.rand(user_size, features) * 0.001
    Y = np.random.rand(item_size, features) * 0.001

    Cui, Ciu = Cui.tocsr(), Cui.T.tocsr()

    for iteration in range(iterations):
        print('iteration %d ' % (iteration + 1))
        least_squares_cg(Cui, X, Y, lambda_val)
        least_squares_cg(Ciu, Y, X, lambda_val)

    return sparse.csr_matrix(X), sparse.csr_matrix(Y)


def alsAlgo(user_id, game_list):
    item_gameId = []
    for games in game_list[0]:
        item_gameId.append(games)

    user_game = dict(zip(item_gameId, game_list[1]))
    user_game['reviewer_name'] = user_id

    # data, function load
    data = load_pickle_data(REVIEW_FOR_COLABORATIVE)

    ##########
    # 리뷰 없는 열 구하기
    # temp = data.ne(0).sum().to_frame().T
    # zero_list = list()
    # for column_name, item in temp.iteritems():
    #     if item[0] == 0:
    #         zero_list.append(column_name)
    # 리뷰 없는 열 삭제
    # data = data.drop(zero_list, axis=1)
    # data.columns = data.columns.str.lstrip('item_')
    # list_to_pickle(data, "reviewer_least_10reviews.pkl")

    data = data.append(user_game, ignore_index=True).fillna(0)
    game_id_list = data.columns.tolist()
    table = data.drop(columns='reviewer_name')

    # Hyper Parameter Setting
    r_lambda = 40
    nf = 200
    alpha = 50
    R = table.to_numpy()

    # nu = number of User, ni = number of Item
    nu = R.shape[0]
    ni = R.shape[1]

    # binary matrix P
    numpyP = np.copy(R)
    P = csr_matrix(numpyP)
    # P[P != 0] = 1

    # initialize X and Y with very small values
    X = sparse.csr_matrix(np.random.rand(nu, nf) * 0.01)  # shape = (10, 200)
    Y = sparse.csr_matrix(np.random.rand(ni, nf) * 0.01)  # shape = (11, 200)

    # 신뢰도 행렬 C
    numpyC = alpha * R + 1
    C = alpha * csr_matrix(R)

    print('run Learning')

    X, Y = implicit_als_cg(C, iterations=20, features=20)

    predict = X.dot(Y.T)
    predict = predict.toarray()

    return predict, game_id_list
