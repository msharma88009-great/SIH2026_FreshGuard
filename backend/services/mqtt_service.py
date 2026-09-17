import json
import logging
import os

import paho.mqtt.client as mqtt

from services.sensor_service import add_sensor_reading

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("freshguard-mqtt")

MQTT_HOST = os.getenv("MQTT_HOST", "localhost")
MQTT_PORT = int(os.getenv("MQTT_PORT", "1883"))
MQTT_TOPIC = os.getenv("MQTT_TOPIC", "freshguard/sensors")


def on_connect(client, userdata, flags, reason_code, properties=None):
    if reason_code == 0:
        logger.info("Connected to MQTT broker: %s:%s", MQTT_HOST, MQTT_PORT)
        client.subscribe(MQTT_TOPIC)
        logger.info("Subscribed to topic: %s", MQTT_TOPIC)
    else:
        logger.error("MQTT connection failed: %s", reason_code)


def on_message(client, userdata, message):
    try:
        payload = json.loads(message.payload.decode("utf-8"))

        if not isinstance(payload, dict):
            logger.error("MQTT payload must be a JSON object")
            return

        result = add_sensor_reading(payload)

        if result.get("success"):
            logger.info(
                "MQTT sensor reading processed: reading_id=%s duplicate=%s",
                result.get("data", {}).get("reading_id"),
                result.get("duplicate"),
            )
        else:
            logger.error("Sensor processing failed: %s", result.get("error"))

    except json.JSONDecodeError:
        logger.error("Invalid JSON received on MQTT topic: %s", message.topic)
    except Exception:
        logger.exception("Error processing MQTT message")


def create_mqtt_client():
    client = mqtt.Client(
        mqtt.CallbackAPIVersion.VERSION2,
        client_id="freshguard-backend",
    )

    client.on_connect = on_connect
    client.on_message = on_message

    return client


def start_mqtt():
    client = create_mqtt_client()
    client.connect(MQTT_HOST, MQTT_PORT, 60)
    client.loop_forever()


if __name__ == "__main__":
    start_mqtt()