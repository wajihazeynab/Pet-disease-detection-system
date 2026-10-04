import { View, Text, ScrollView, StyleSheet, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { apiGet } from '../api'
import { useSelector } from 'react-redux'

const AppointmentReceiveScreen = ({ navigation }) => {

    const userModal = useSelector(e => e.user_reducer.userModal)

    const [appointment, setAppointment] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        navigation.addListener('focus', () => {
            getAppointment()
        })
    }, [navigation])

    const getAppointment = async () => {
        const res = await apiGet('/vet/appointment_receive', userModal.accessToken)
        console.log("res-", res)
        if (res.check) {
            setAppointment(res.data)
        }
        else {
            setAppointment([])
        }
    }

    return (
        <ScrollView style={{ backgroundColor: '#fff', paddingHorizontal: 15 }}>
            <View style={styles.container}>
                <Text style={styles.title}>Book Appointment</Text>
            </View>

            <FlatList
                data={appointment}
                renderItem={({ item }) => (
                    <View style={styles.receive}>
                        <Text style={{ fontSize: 16, color: '#6CB0E6' }}>{userModal?.type == 'vet' ? item.userData[0]?.name : item.vetData[0]?.name}</Text>
                        <Text style={{ fontSize: 14 }}>{item.appointmentdate} - {item.appointmenttimeSlot}</Text>
                    </View>
                )}
                ListEmptyComponent={
                    !loading && <Text style={{ textAlign: 'center', fontSize: 16, marginTop: 20 }}>List emty</Text>
                }
                refreshControl={<RefreshControl loading={loading} onRefresh={getAppointment} />}
            />
        </ScrollView>
    )
}

export default AppointmentReceiveScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingTop: 60
    },
    title: {
        color: "black",
        fontSize: 30,
        fontWeight: "bold",
        alignSelf: "center",
    },
    receive: {
        borderWidth: 1,
        borderColor: '#6CB0E6',
        marginTop: 10,
        borderRadius: 5,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})