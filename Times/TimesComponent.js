import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    TextInput
} from 'react-native';
const {width,height}=Dimensions.get('window');
export default class TimesComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            changeState:false,
            timeNumber:0,
            minuteNumber:0,
            minute:0,
            second:0
        };
    }

    timing=()=>{
        const times=this.state.timeNumber;
        const minutes=this.state.minuteNumber;

        //如果没有设计时间就弹出'你还没有设计时间'
        if(this.state.minute==0&&this.state.second==0){
            alert('你还没有设计时间');
            this.interval && clearInterval(this.interval);
            this.setState({
                changeState:false
            })
        }else if(this.state.second>=10) {
            alert('最大为9秒');
            //为了方便显示我设置了10s进1，所以秒钟上最大为9
            this.setState({
                changeState:false
            })
        }else {

            //开始计时
            this.setState({
                changeState:!this.state.changeState,
            },()=>{
                if(this.state.changeState) {
                    this.interval = setInterval(() => {
                        const timer = this.state.timeNumber + 1;
                        const minuter = this.state.minuteNumber;
                        //如果秒跑到了10，那么分钟加1，秒变回0
                        if (timer == 10) {
                            const minuter = this.state.minuteNumber + 1;
                            this.setState({
                                timeNumber: 0,
                                minuteNumber: minuter
                            })

                            //如过跑到了你输入的时间则停止，并且告诉你时间到了
                        } else if (minuter >= this.state.minute && timer >= this.state.second) {
                            this.interval && clearInterval(this.interval);
                            this.setState({
                                timeNumber:timer
                            });
                            alert('时间到了');
                            //显示跑了多久了
                        } else if (timer != 10) {
                            this.setState({
                                timeNumber: timer,
                                minuteNumber: minuter,
                            })
                        }
                    }, 1000);
                }
            })
        }
    };

//暂停计时器
    stop=()=>{
        this.interval && clearInterval(this.interval);
        this.setState({
            changeState:false
        })
    };
//执行清除，计时器上所有时间清零
    clear=()=>{
        this.interval && clearInterval(this.interval);
        this.setState({
            timeNumber:0,
            minuteNumber:0,
            changeState:false
        })
    };




    componentWillUnmount(){
        this.interval && clearInterval(this.interval);
    };
    render() {
        const {timeNumber,minuteNumber}=this.state;
        //如果开始计时，则'开始计时'不能按
        var Main;
        Main=(this.state.changeState==false
            ?<TouchableOpacity
                onPress={()=>{
                    this.timing();
                }}
            >
                <Text>开始计时</Text>
            </TouchableOpacity>
            :<Text>开始计时</Text>);
        return (
            <View style={styles.container}>
                <View style={{flexDirection:'row'}}>
                    <Text>你打算跑<TextInput
                        style={{height:20,width:20,backgroundColor:'silver'}}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder=""
                        maxLength={2}
                        selectTextOnFocus={true}
                        onChangeText={(Number)=>{
                            this.setState({
                                minute:Number,
                            })
                        }}
                    />分<TextInput
                        style={{height:20,width:20,backgroundColor:'silver'}}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder=""
                        maxLength={2}
                        selectTextOnFocus={true}
                        onChangeText={(Number)=>{
                            this.setState({
                                second:Number,
                            })
                        }}
                    />秒</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text >{minuteNumber}分</Text>
                    <Text >{timeNumber}秒</Text>
                </View>
                {Main}
                <TouchableOpacity
                    onPress={()=>{
                        this.stop()
                    }}
                >
                    <Text>暂停</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{
                        this.clear();
                    }}
                >
                    <Text>清除时间</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width:width,
        height:height,
        alignItems:'center',
        justifyContent:'center',
    },
});