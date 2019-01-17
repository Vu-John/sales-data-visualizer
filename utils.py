import httplib2
import os
from apiclient import discovery
from dotenv import load_dotenv

# Load environment variable(s)
load_dotenv()

# The ID and range of a sample sale orders spreadsheet.
SPREADSHEET_ID = '1xQO4sCn5g7i7vQ4894Bxi_wzqkrREJOe5k7aeZ2iW8M'
RANGE = 'sales.csv!A2:H'


def google_sheets_data():
    # Use Google Discovery API to access sheets data without OAuth 2.0
    discoveryUrl = ('https://sheets.googleapis.com/$discovery/rest?version=v4')
    service = discovery.build('sheets',
                              'v4',
                              http=httplib2.Http(),
                              discoveryServiceUrl=discoveryUrl,
                              developerKey=os.getenv("DEVELOPER_KEY"))

    # Call the Sheets API
    sheet = service.spreadsheets()
    result = sheet.values().get(spreadsheetId=SPREADSHEET_ID,
                                range=RANGE).execute()
    return result.get('values', [])


def sale_orders_data():
    # Fetch sheet data from Google
    sale_orders = google_sheets_data()

    # Create object out of each data entry
    data = []
    for sd in sale_orders:
        customer, order_amount, street, street2, city, country, state, email = sd
        data_obj = {'customer': customer, 'order_amount': order_amount, 'street': street,
                    'street2': street2, 'city': city, 'country': country, 'state': state, 'email': email}
        data.append(data_obj)

    return data
