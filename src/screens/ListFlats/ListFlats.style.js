import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  flatContainer: {
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  flatName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00796b",
  },
  flatDescription: {
    fontSize: 14,
    color: "#455a64",
    marginBottom: 5,
  },
  heartIconContainer: {
    padding: 5,
    borderRadius: 5,
  },
  whatsappIconContainer: {
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  iconText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#546e7a",
  },
  userIconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  userIcon: {
    padding: 10,
    borderRadius: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
