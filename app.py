from flask import Flask, render_template
from utils import sale_orders_data

app = Flask(__name__, static_url_path='/static')

# Load sale orders data
sale_orders = sale_orders_data()


@app.route('/')
def index():
    return render_template('index.html', orders=sale_orders)


@app.route('/orders')
def orders():
    return render_template('orders.html', orders=sale_orders)


if __name__ == '__main__':
    app.run(debug=True)
