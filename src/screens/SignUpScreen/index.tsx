import { View, Text, Alert, Button } from "react-native";
import React, { useState } from "react";
import auth from "@react-native-firebase/auth";
import {
  getDoc,
  doc,
  updateDoc,
  collection,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../config/config";
import firestore from "@react-native-firebase/firestore";

const SignUpScreen = () => {
  const [user, setUser] = useState<any>(null);

  const authUser = (actionType: string) => {
    if (actionType === "isSignUp") {
      auth()
        .createUserWithEmailAndPassword("alaanaeeim@gmail3.com", "Aa12345")
        .then((res: any) => {
          setUser(res?.user);
          Alert.alert("Account Created", "You have successfully signed up!");
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            Alert.alert(
              "Email In Use",
              "This email is already associated with another account."
            );
          } else if (error.code === "auth/invalid-email") {
            Alert.alert(
              "Invalid Email",
              "The email address is badly formatted."
            );
          } else if (error.code === "auth/weak-password") {
            Alert.alert(
              "Weak Password",
              "The password must be at least 6 characters long."
            );
          } else {
            Alert.alert("Error", error.message);
          }
        });
    } else {
      auth()
        .signInWithEmailAndPassword("alaanaeeim@gmail.com", "Aa12345")
        .then((res: any) => {
          setUser(res?.user);
          Alert.alert("Login Successful", "You are now logged in!");
        })
        .catch((error) => {
          if (error.code === "auth/invalid-email") {
            Alert.alert(
              "Invalid Email",
              "The email address is badly formatted."
            );
          } else if (error.code === "auth/wrong-password") {
            Alert.alert("Wrong Password", "The password is incorrect.");
          } else if (error.code === "auth/user-not-found") {
            Alert.alert("User Not Found", "There is no user with this email.");
          } else {
            Alert.alert("Error", error.message);
          }
        });
    }
  };

  const LogOut = () => {
    console.log("LogOut User");
    auth()
      .signOut()
      .then(() => {
        console.log("User signed out!");
        setUser(null);
      });
  };

  const addUser = () => {
    firestore()
      .collection("users")
      .add({
        name: "ALAA NAEEIM",
        age: "15",
        level: 1,
        street: "Library wael",
      })
      .then((docRef: any) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((err: any) => {
        console.log("Error adding document: ", err);
      });
  };

  const markAttendance = (userId: string) => {
    const today = new Date();
    const dateString = today.toISOString().split("T")[0];

    firestore()
      .collection("users")
      .doc(userId)
      .collection("attendance")
      .doc(dateString)
      .set({
        date: dateString,
        status: true,
      })
      .then(() => {
        console.log("Attendance marked for user: ", userId);
      })
      .catch((err) => {
        console.log("Error marking attendance: ", err);
      });
  };

  const getAttendanceByMonth = async (
    userId: string,
    year: number,
    month: number
  ) => {
    const startOfMonth = new Date(year, month - 1, 1); // Month is 0-indexed
    const endOfMonth = new Date(year, month, 1); // Next month, day 1

    const attendanceSnapshot = await firestore()
      .collection("users")
      .doc(userId)
      .collection("attendance")
      .where("date", ">=", startOfMonth.toISOString().split("T")[0])
      .where("date", "<", endOfMonth.toISOString().split("T")[0])
      .get();

    const attendanceRecords = attendanceSnapshot.docs.map((doc) => doc.data());
    console.log("Attendance records for month: ", attendanceRecords);
    return attendanceRecords;
  };

  const updateUser = (userId: string, updatedData: any) => {
    firestore()
      .collection("users")
      .doc(userId)
      .update(updatedData)
      .then(() => {
        console.log("User updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating user: ", error);
      });
  };

  const getUserById = async (userId: string) => {
    try {
      const userDoc = await firestore().collection("users").doc(userId).get();

      if (userDoc.exists) {
        console.log("User data:", userDoc.data());
        return userDoc.data(); // Return the user data
      } else {
        console.log("No such user found!");
        return null; // Return null if the user does not exist
      }
    } catch (error) {
      console.error("Error getting user: ", error);
      return null; // Handle any errors
    }
  };

  const deleteUserById = async (userId: string) => {
    try {
      await firestore().collection("users").doc(userId).delete();

      console.log("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  return (
    <View>
      <Text>{user?.email?.split("@")[0] || ""}</Text>
      <Button title="Login User" onPress={() => authUser("Login")} />
      <Button title="SignUp User" onPress={() => authUser("isSignUp")} />
      <Button title="LogOut" onPress={() => addUser()} />

      <Button title="Add User" onPress={() => addUser()} />

      <Button
        title="Mark Attendance User"
        onPress={() => markAttendance("Zvle5fWV5y46gmpdFf3s")}
      />

      <Button
        title="Get Attendance User"
        onPress={() => getAttendanceByMonth("Zvle5fWV5y46gmpdFf3s", 2024, 10)}
      />

      <Button
        title="Get User"
        onPress={() => getUserById("iCplTPzEJ7GDgVUaqzUe")}
      />
      <Button
        title="Delete User"
        onPress={() => deleteUserById("iCplTPzEJ7GDgVUaqzUe")}
      />
      <Button
        title="Update User"
        onPress={() =>
          updateUser("iCplTPzEJ7GDgVUaqzUe", {
            name: "UPDATED USER DATA",
            age: 13,
            level: 14,
          })
        }
      />
    </View>
  );
};

export default SignUpScreen;
