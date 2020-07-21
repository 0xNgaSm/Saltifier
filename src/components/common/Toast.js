import React, { Component } from 'react';
import { View, Animated, Dimensions, Text } from 'react-native';

class RNToast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            text: '',
            opacityValue: new Animated.Value(this.props.opacity),
        };
    }

    showMessage(text, duration, callback) {
        this.duration = typeof duration === 'number' ? duration : 500;
        this.callback = callback;
        this.setState({
            isShow: true,
            text: text,
        });

        this.animation = Animated.timing(this.state.opacityValue, {
            toValue: this.props.opacity,
            duration: this.props.fadeInDuration,
            useNativeDriver: true
        });
        this.animation.start(() => {
            this.isShow = true;
            if (duration !== 0) {
                this.close();
            }
        });
    }

    close(duration) {
        let delay = typeof duration === 'undefined' ? this.duration : duration;
        if (delay === 0) {
            delay = this.props.defaultCloseDelay || 250;
        }
        if (!this.isShow && !this.state.isShow) {
            return;
        }
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.animation = Animated.timing(this.state.opacityValue, {
                toValue: 0.0,
                duration: this.props.fadeOutDuration,
                useNativeDriver: true
            });
            this.animation.start(() => {
                this.setState({
                    isShow: false,
                });
                this.isShow = false;
                if (typeof this.callback === 'function') {
                    this.callback();
                }
            });
        }, delay);
    }

    componentWillUnmount() {
        this.animation && this.animation.stop();
        this.timer && clearTimeout(this.timer);
    }

    render() {
        const { height, width } = Dimensions.get('window');
        let pos;
        switch (this.props.position) {
            case 'top':
                pos = this.props.positionValue;
                break;
            case 'center':
                pos = height / 2;
                break;
            case 'bottom':
                pos = height - this.props.positionValue;
                break;
        }
        const view = this.state.isShow ? (
            <View style={[styles.container, { top: pos }]} pointerEvents="none">
                <Animated.View

                    style={[
                        styles.content,
                        { opacity: this.state.opacityValue },
                        this.props.style,
                    ]}>
                    {React.isValidElement(this.state.text) ? (
                        this.state.text
                    ) : (
                            <Text style={this.props.textStyle}>{this.state.text}</Text>
                        )}
                </Animated.View>
            </View>
        ) : null;
        return view;
    }
}

const styles = {
    container: {
        position: 'absolute',
        left: 10,
        right: 10,
        elevation: 999,
        alignItems: 'center',
        zIndex: 10000,
    },
    content: {
        backgroundColor: '#000000',
        borderRadius: 5,
        padding: 10,
    },
    text: {
        color: '#ffffff',
    },
};

RNToast.defaultProps = {
    position: 'bottom',
    textStyle: styles.text,
    positionValue: 120,
    fadeInDuration: 500,
    fadeOutDuration: 500,
    opacity: 1,
};

let ref = void 0;
const showMessage = (message, ms = 2000) => {
    if (!message || !ref) {
        return;
    }
    ref.showMessage(message, ms);
};

class Toast extends React.Component {
    componentWillUnmount() {
        ref = void 0;
    }

    render() {
        return <RNToast ref={classRef => (ref = classRef)} />;
    }
}

export { showMessage, Toast };