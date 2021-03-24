from django.shortcuts import render
from django.http import HttpResponse

def button(request):
    return render(request, 'scpTest.html')


def buttonSCP(request):
    print("SCP Button INSERT CODE HERE")
    return render(request, 'scpTest.html')