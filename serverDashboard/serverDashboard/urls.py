"""serverDashboard URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView
from . import testing
from . import scpTest
from . import meteorologicalVariables
from . import climateIndices
from . import climateVariables

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', testing.button),
    path('', scpTest.button),
    path('', meteorologicalVariables.handle),
    path('scpTest', scpTest.buttonSCP, name="scp"),
    path('meteorologicalVariablesHandler', meteorologicalVariables.handle,name="MetVar"),
    path('climateVariablesHandler', climateVariables.handle,name="CliVar"),
    path('climateIndicesHandler', climateIndices.handle,name="CliInd"),
    path('buttonCode', testing.buttonCodeTest, name="script"),
    path('', TemplateView.as_view(template_name='index.html')),
]
