import { View, Text, Modal, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import * as colors from '../styles'
import CalendarPicker from 'react-native-calendar-picker'
import { scale } from '../constants'
import moment from 'moment'

const CalenderPickerModal = ({ modal, setModal, setPickupDate, pickupDate, setActive, status }) => {

    const [select, setSelect] = useState()
    const [end, selEnd] = useState(false)

    return (
        <Modal
            animationType="slide"
            transparent={true}
            onRequestClose={() => {
                setModal(false);
                setPickupDate("");
            }}
            visible={modal}
        >
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <View style={{ width: SCREEN_WIDTH, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, backgroundColor: colors.APP_WHITE_COLOR, paddingHorizontal: 15, paddingVertical: 10 }}>
                    <CalendarPicker
                        onDateChange={(date, type) => {
                            // if (multiple) {
                            //     console.log(type)
                            //     if (type == "START_DATE") {
                            //         selEnd(false)
                            //         setSelect(date)
                            //     }
                            //     else {
                            //         selEnd(true)
                            //         setSelect(`${moment(select).format("DD MMM YYYY")} - ${moment(date).format("DD MMM YYYY")}`)
                            //     }
                            // }
                            // else {
                            setPickupDate(date)
                            // }
                        }}

                        disabledDates={(datesss) => {
                            // let day = moment(datesss).format('ddd');
                            // console.log('day', day)
                            // console.log("checkHolidayDates: ", checkHolidayDates(datesss));
                            // if (checkEnablePickupDates(day) && checkHolidayDates(datesss, 'pickup')) {
                            //     return false
                            // }
                            // else {
                            //     return true
                            // }
                        }}

                        nextTitleStyle={{
                            // fontFamily: REGULAR_AMAZON_EMBER,
                            fontWeight: '600'
                        }}
                        previousTitleStyle={{
                            // fontFamily: REGULAR_AMAZON_EMBER,
                            fontWeight: '600'
                        }}
                        firstDay={1}
                        // allowRangeSelection={multiple}
                        markedDates={pickupDate}
                        markingType={'interactive'}
                        nextTitle={localization.next}
                        previousTitle={localization.previous}
                        minDate={new Date()}
                        // maxDate={props.pickUpDay.code == "same_day" ? moment(new Date(Date.now())).clone().add(0, 'days') : moment(new Date(Date.now())).clone().add(1, 'days')}
                        startFromMonday={true}
                        // todayBackgroundColor={colors.APP_WHITE_COLOR}
                        selectedDayColor={colors.APP_BTN_COLOR}
                        selectedDayTextColor={'white'}
                    // selectedBackgroundColor={colors.APP_DARK_GREEN_COLOR}
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableOpacity
                            onPress={() => {
                                setModal(false);
                                setPickupDate("");
                            }}
                            style={[styles.submitButton, { backgroundColor: colors.APP_GRAY_COLOR }]} >
                            <Text style={{ color: 'white', fontSize: 14, fontFamily: REGULAR_AMAZON_EMBER, fontWeight: '600' }}>{localization.close.toUpperCase()}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                setModal(false)
                                // if (multiple) {
                                //     let arr = pickupDate
                                //     if (end) {
                                //         arr.push(select)
                                //     }
                                //     else {
                                //         arr.push(moment(select).format("DD / MMM / YYYY"))
                                //     }
                                //     setPickupDate(arr)
                                // }

                            }}

                            style={styles.submitButton} >
                            {/* {isPickupDateLoading ?
                                <Loader />
                                : */}
                            <Text style={{ color: 'white', fontSize: 14, fontFamily: REGULAR_AMAZON_EMBER, fontWeight: '600' }}>{localization.select.toUpperCase()}</Text>
                            {/* } */}
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    )
}

export default CalenderPickerModal

const styles = StyleSheet.create({
    submitButton: {
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: colors.APP_DARK_GREEN_COLOR,
        width: SCREEN_WIDTH * 0.4,
        height: scale(46),
        borderRadius: 1,
        marginVertical: scale(25),
    },
})