import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from matplotlib import pyplot
from pandas import DataFrame
import os

from statsmodels.tsa.stattools import adfuller
from pmdarima import auto_arima
from pandas.plotting import autocorrelation_plot

from sklearn.metrics import mean_squared_error
from math import sqrt

# from statsmodels.tsa.arima.model import ARIMApyplot.show()

inventory_df = pd.read_csv('random_data.csv')
inventory_df['created_at'] = pd.to_datetime(inventory_df['created_at'])
df= inventory_df.set_index(['created_at'])
df = df.drop(columns=['entry_id'], axis=1)
train_df = df[:round(len(inventory_df)*0.9)]
test_df = df[round(len(inventory_df)*0.9):]

rolling_mean = df.rolling(window=12).mean()
rolling_std = df.rolling(window=12).std()
plt.figure(figsize = (10,6))
plt.plot(df, color='cornflowerblue', label='Original')
plt.plot(rolling_mean, color='firebrick', label='Rolling Mean')
plt.plot(rolling_std, color='limegreen', label='Rolling Std')
plt.xlabel('Date', size = 12)
plt.ylabel('Monthly Beer Production', size  = 12)
plt.legend(loc = 'upper left')
plt.title('Rolling Statistics', size = 14)
plt.show()

from statsmodels.tsa.statespace.sarimax import SARIMAX
arima_model = SARIMAX(train_df['field2'], order = (4,1,1), seasonal_order = (4,2,1,12))
arima_result = arima_model.fit()
arima_result.summary()

arima_pred = arima_result.predict(start = len(train_df), end = len(df)-1, typ="levels").rename("ARIMA Predictions")


test_df['field2'].plot(figsize = (16,5), legend=True)
arima_pred.plot(legend = True);

import joblib
joblib.dump(arima_result, 'arima_model.pkl')