from datetime import datetime, date
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render


def home(request):
    return render(request, 'index.html')

@api_view(['GET'])
def hello(request):
    return Response({'message': 'Hello, world!'})

