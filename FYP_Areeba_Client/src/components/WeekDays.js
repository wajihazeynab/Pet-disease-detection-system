import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { scale } from "../constants";
import * as colors from "../styles";
import moment from "moment";

const DaysOfWeek = ({ selectedDay, setSelectedDay, selectWeek }) => {

  const [dates, setDates] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weekDates = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      const dayOfWeek = days[date.getDay()];
      const dayOfMonth = date
      weekDates.push({ dayOfWeek, dayOfMonth });
    }
    setDates(weekDates);
  }, []);

  return (
    <View style={styles.container}>
      {dates.map((date, index) => {
        let flag = selectWeek.find(e => e.substring(0, 3) == date.dayOfWeek)

        return (
          <TouchableOpacity
            key={index}
            style={[styles.dayContainer, {}]}
            onPress={() => flag && setSelectedDay(date.dayOfMonth)}
          >
            <Text style={[styles.dayOfWeek]}>{date.dayOfWeek}</Text>
            <Text
              style={[
                styles.dayOfMonth,
                selectedDay === date.dayOfWeek && styles.selectedDayOfMonth,
                { borderColor: flag ? colors.APP_BTN_COLOR : '#BDBDBD', color: flag ? selectedDay == date.dayOfMonth ? 'white' : colors.APP_BTN_COLOR : '#BDBDBD', backgroundColor: selectedDay == date.dayOfMonth ? colors.APP_BTN_COLOR : 'white' }
              ]}
            >
              {moment(date.dayOfMonth).format('dd')}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: scale(10),
    marginTop: scale(15),
  },
  dayContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  dayOfWeek: {
    fontSize: 16,
    fontWeight: "500",
  },

  dayOfMonth: {
    borderColor: colors.APP_BTN_COLOR,
    borderRadius: scale(5),
    borderWidth: scale(2),
    fontSize: 16,
    marginTop: 5,
    fontWeight: "500",
    color: colors.APP_BTN_COLOR,
    padding: scale(10),
    minWidth: scale(40),
  },
  selectedDayOfMonth: {
    color: "white",
    backgroundColor: colors.APP_BTN_COLOR,
  },
});

export default DaysOfWeek;
