import { ORDERS } from "@/assets/orders";
import { Order } from "@/assets/types/order";
import { Link } from "expo-router";
import React, { Component } from "react";
import { FlatList, ListRenderItem, Pressable, StyleSheet, Text, View } from "react-native";
const statusDisplayText:Record<string,string>={
  Pending:'Pending',
  Completed:'Completed',
  Shipped:'Shipped',
  InTransit:'In Transit'
}
const renderItem: ListRenderItem<Order> = ({ item }) => (
  <Link href={`/orders/${item.slug}` as never} asChild>
    <Pressable style={styles.orderContainer}>
      <View style={styles.orderContent}>
        <View style={styles.orderDetailsContainer}>
          <Text style={styles.orderItem}>{item.item}</Text>
          <Text style={styles.orderDetails}>{item.details}</Text>
          <Text style={styles.orderDate}>{item.date}</Text>
        </View>
        <View style={[
          styles.statusBadge,styles[`statusbar_${item.status}`]
        ]}>
<Text style={styles.statusText}>
{statusDisplayText[item.status]}
</Text>
        </View>
      </View>
    </Pressable>
  </Link>
);
const Orders=()=>{
return (
  <View style={styles.container}>
<FlatList data={ORDERS} renderItem={renderItem} keyExtractor={item=>item.id.toString()}/>
  </View>
)
}
export default Orders
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  orderContainer: {
    backgroundColor: "#f8f8f8",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  orderContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderDetailsContainer: {
    flex: 1,
  },
  orderItem: {
    fontSize: 18,
    fontWeight: "bold",
  },
  orderDetails: {
    fontSize: 14,
    color: "#555",
  },
  orderDate: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  statusbar_Pending: {
    backgroundColor: "#ffcc00",
  },
  statusbar_Completed: {
    backgroundColor: "#4caf50",
  },
  statusbar_InTransit: {
    backgroundColor: "#2196f3",
  },
  statusbar_Shipped: {
    backgroundColor: "#ff9800",
  },
});
