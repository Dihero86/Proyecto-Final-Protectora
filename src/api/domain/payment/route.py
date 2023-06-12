from flask import Flask, render_template, jsonify, request, Blueprint
import json
import stripe
import os

api = Blueprint('/api/pay', __name__)
stripe.api_key =os.environ.get("STRIPE_PASS")

@api.route('/create-payment-intent', methods=['POST'])
def create_payment():
    try:
        data = request.get_json()
        intent = stripe.PaymentIntent.create(
            amount= int(data["amount"])*100,
            currency='eur',
            metadata={'integration_check': 'accept_a_payment'},
        )
        return jsonify({
            'clientSecret': intent['client_secret']
        })
        return ("hola")
    except Exception as e:
        return jsonify(error=str(e)), 403