import React, { useRef } from "react";
import { Button, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

export default function HomeScreen() {
  const webViewRef = useRef<WebView>(null);

  const iframeString = `<iframe id="alisha" src="https://langara-avatar-staging-385c2dc27d8e.herokuapp.com/real.html" width="100%" height="100%" frameborder="0"></iframe>`;

  const sendMessageToIframe = (currentEmotion: string) => {
    const jsCode = `
      const alisha = document.getElementById("alisha");
      if (alisha && alisha.contentWindow) {
        alisha.contentWindow.postMessage(
          { call: "sendValue", langaraEmotion: "${currentEmotion}" },
          "*"
        );
      }
      true; // Return true to indicate successful execution
    `;

    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(jsCode);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.webViewContainer}>
        <WebView
          ref={webViewRef}
          scalesPageToFit={true}
          bounces={false}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          source={{
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                  body { margin: 0; padding: 0; overflow: hidden; }
                  #baseDiv { width: 100%; height: 100vh; }
                  iframe { width: 100%; height: 100%; border: none; }
                </style>
              </head>
              <body>
                <div id="baseDiv">${iframeString}</div>
              </body>
              </html>
            `,
          }}
          automaticallyAdjustContentInsets={false}
          onMessage={(event) => {
            // Handle messages from WebView if needed
            console.log("Message from WebView:", event.nativeEvent.data);
          }}
        />

        {/* Example button to trigger the message */}
        <View style={styles.buttonContainer}>
          <Button
            title="Send Happy Emotion"
            onPress={() => sendMessageToIframe("Happiness")}
          />
          <Button
            title="Send Sad Emotion"
            onPress={() => sendMessageToIframe("Sadness")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webViewContainer: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
