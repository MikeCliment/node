from web3 import Web3 as web3
from getpass import getpass

# Conexión a la red local de Ganache
web3 = web3(web3.HTTPProvider('http://127.0.0.1:7545'))

# Obtener la cuenta y clave privada del usuario
def get_user_credentials():
    address = "0x82443AC1f0054Fe459d0b68D26B713893d43ff75"
    private_key = "0d7e887a3cbc68a6db767e7419949395631379600e219f1858355e84c800b71a"
    return address, private_key

# Obtener la cuenta del destinatario
def get_recipient():
    recipient = "0xc2C35ce3b8001F0371E4cb0c0BAc4F6e7CA7D499"
    return recipient

# Enviar Ether al destinatario
def send_ether():
    user_address, private_key = get_user_credentials()
    recipient_address = get_recipient()

    # Chequear la conexión de la cuenta del usuario
    if web3.is_connected() == False:
        print("Error: No estás conectado a la red Ethereum")
        return

    # Verificar la validez de las direcciones
    if web3.is_address(user_address) == False or web3.is_address(recipient_address) == False:
        print("Error: Dirección de cuenta inválida")
        return

    # Verificar el saldo del usuario
    balance = web3.eth.get_balance(user_address)
    if balance < web3.to_wei(1, 'ether'):
        print("Error: Saldo insuficiente")
        return

    # Enviar la transacción
    transaction = {
        'to': recipient_address,
        'value': web3.to_wei(20, 'ether'),
        'gas': 21000,
        'gasPrice': web3.to_wei(10, 'gwei'),
        'nonce': web3.eth.get_transaction_count(user_address),
    }

    signed_transaction = web3.eth.account.sign_transaction(transaction, bytes.fromhex(private_key))
    tx_hash = web3.eth.send_raw_transaction(signed_transaction.rawTransaction)
    tx_receipt = web3.eth.wait_for_transaction_receipt(tx_hash)

    print('Transacción enviada. Hash:', tx_receipt.transactionHash.hex())

# Llamar a la función para enviar Ether
send_ether()
