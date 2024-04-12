from datetime import date


from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def hello_world(request):
    return Response({'message': 'Hello, world!'})


def getPredictions(day):
    import joblib
    day_diff = 500 + (date.today() - date(2024, 2, 6)).days
    model = joblib.load("D:\\Temp\\IIOT\\Inventorymanagement\\myapi\\arima_model.pkl")
    prediction = model.prediction = model.predict(start=day_diff, end=day_diff + day, typ="levels").rename(
        "ARIMA Predictions")
    return prediction


@api_view(['GET'])
def predictions(request):
    import pandas as pd
    day = int(request.GET.get('day', 0))
    sf = getPredictions(day)

    result_df = pd.DataFrame({'date': sf.index, 'prediction': sf.values})
    result_df['date'] = result_df['date'].dt.strftime('%Y-%m-%d')
    result_df['prediction'] = result_df['prediction'].astype(int)

    return Response({'dates': result_df['date'].tolist(), 'predictions': result_df['prediction'].tolist()})