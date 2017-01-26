
from django import forms
from django.forms.models import ModelForm
from djangocms_table.widgets import TableWidget
from djangocms_table.models import Table
from django.utils.translation import ugettext_lazy as _
import csv
from io import TextIOWrapper
import json


class TableForm(ModelForm):
    table_data = forms.CharField(widget=TableWidget)
    csv_upload = forms.FileField(label=_("upload .csv file"), help_text=_("upload a .csv file to fill the table up."), required=False)

    def clean_csv_upload(self):
        if self.cleaned_data['csv_upload']:

            # Make sure we decode the file to text
            encoding = self.cleaned_data['csv_upload'].charset if self.cleaned_data['csv_upload'].charset else 'utf-8'
            f = TextIOWrapper(self.cleaned_data['csv_upload'].file, encoding=encoding)
            csv_reader = csv.reader(f, dialect='excel')
            data = []
            for row in csv_reader:
                data.append(row)
            self.cleaned_data['table_data'] = json.dumps(data)
            self.csv_uploaded = True

    class Meta:
        model = Table
        exclude = (
            'page',
            'position',
            'placeholder',
            'language',
            'plugin_type',
        )
