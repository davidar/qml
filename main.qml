import QtQuick 2.4
import QtCanvas3D 1.0
import QtQuick.Window 2.2
import QtQuick.Controls 1.4

import "glcode.js" as GLCode

Window {
    title: "Waves"
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
                    Label {
                        anchors.centerIn: parent
                        font.pixelSize: 22
                        text: "Hello, world!"
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

