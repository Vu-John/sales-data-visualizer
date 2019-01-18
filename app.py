import os
from flask import Flask, render_template
from utils import sale_orders_data

app = Flask(__name__, static_url_path='/static')


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html', orders=sale_orders_data())


@app.route('/orders', methods=['GET'])
def orders():
    return render_template('orders.html', orders=sale_orders_data())


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
