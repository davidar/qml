import QtQuick 2.4
import QtCanvas3D 1.0
import QtQuick.Window 2.2
import QtQuick.Controls 1.4

import "glcode.js" as GLCode

Window {
    title: "QML Demo"
    width: 800
    height: 480
    visible: true

    TabView {
        anchors.fill: parent

        Tab {
            title: "Waves"

            SplitView {

                Item {
                    width: parent.width/2
                    height: parent.height
                    TextArea {
                        id: code
                        anchors.fill: parent
                        readOnly: true
                        text: "Loading..."

                        Component.onCompleted: {
                            var request = new XMLHttpRequest()
                            request.open('GET', "qrc:/glcode.js")
                            request.onreadystatechange = function(event) {
                                if (request.readyState === XMLHttpRequest.DONE) {
                                    code.text = request.responseText
                                }
                            }
                            request.send()
                        }
                    }
                }

                Canvas3D {
                    id: canvas3d
                    width: parent.width/2
                    height: parent.height

                    onInitializeGL: {
                        GLCode.initializeGL(canvas3d);
                    }

                    onPaintGL: {
                        GLCode.paintGL(canvas3d);
                    }

                    onResizeGL: {
                        GLCode.resizeGL(canvas3d);
                    }
                }
            }
        }
    }
}

