import logging

logging.basicConfig(
    level=logging.INFO,
    # format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    format='%(levelname)s:     %(message)s',
    handlers=[
        # logging.FileHandler("app.log"),
        logging.StreamHandler()            # Also log to console
    ]
)

def get_logger(__name__):
    return logging.getLogger(__name__)
