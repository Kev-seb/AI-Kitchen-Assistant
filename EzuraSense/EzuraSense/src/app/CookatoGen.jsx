```javascript
import { StatusBar } from "expo-status-bar";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { Link, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";

import ListHolder from "../components/ListHolder";
import Loading from "../components/Loading";
import Error from "../components/Error";

const Colors = require("../codes/colors.json");

const apiKey = "YOUR_API_KEY";
const apiURL = "https://api.groq.com/openai/v1/chat/completions";

export default function Index() {

  const router = useRouter();
  const [recipe, setRecipe] = useState({});
  const [ingredient, setIngredients] = useState({});
  const [loading, setLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    Heading: require("../../assets/fonts/PlaywriteUSModern-Regular.ttf"),
  });

  const GetData = async () => {
    try {

      const res = await fetch("http://192.168.1.9:5000/data");
      const ingredients = await res.json();

      setIngredients(ingredients);

      const prompt =
        "Generate a recipe using only these ingredients: " +
        ingredients.Vegetables +
        ". Return ONLY a valid JS object with fields Name, Type, Ingredients, Instructions, CookingTime, Notes, FunnyFact, Difficulty.";

      const response = await fetch(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + apiKey,
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b",
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await response.json();

      return data.choices[0].message.content;

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    const fetchRecipe = async () => {

      const result = await GetData();

      if (result) {
        try {
          setRecipe(JSON.parse(result));
        } catch {
          setRecipe(undefined);
        }
      }

      setLoading(false);
    };

    fetchRecipe();

  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <Loading />
      </View>
    );
  }

  if (!recipe) {
    return <Error />;
  }

  const ing = recipe.Ingredients.map(item =>
    Object.values(item).join(" ")
  );

  if (!fontsLoaded) return null;

  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Link href="/CookATo" style={styles.back_btn}>
          <Ionicons name="chevron-back" size={40} color="orange" />
        </Link>

        <Image
          resizeMode="contain"
          source={require("../../assets/Cookato_badge.png")}
          style={styles.header_img}
        />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ alignItems: "center", paddingBottom: 120 }}
      >

        <View style={styles.sub_con}>

          <View style={styles.banner}>

            <Image
              style={styles.banner_img}
              resizeMode="contain"
              source={require("../../assets/LOGO12024x1024_Transparent.png")}
            />

            <View style={styles.banner_details}>

              <Text style={styles.head_txt}>
                {recipe.Name}
              </Text>

              <Text style={styles.time}>
                ⏱ Cooking Time: {recipe.CookingTime}
              </Text>

            </View>

          </View>

          <View style={styles.section}>
            <ListHolder
              title="🍽 Ingredients"
              list={ing}
            />

            <TouchableOpacity
              style={styles.edit}
              onPress={() =>
                router.push({
                  pathname: "/components/EditIngredients",
                  params: { list: JSON.stringify(ingredient) },
                })
              }
            >
              <Feather name="edit" size={20} />
              <Text>Edit Ingredients</Text>
            </TouchableOpacity>

          </View>

          <View style={styles.section}>
            <ListHolder
              title="🧑‍🍳 Instructions"
              list={recipe.Instructions}
            />
          </View>

          <View style={styles.section}>
            <ListHolder
              title="🗒 Notes"
              list={[recipe.Notes]}
            />
          </View>

        </View>

      </ScrollView>

      <StatusBar
        backgroundColor={
          Platform.OS === "android"
            ? Colors.Color_Codes.cookato.bg
            : "transparent"
        }
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.Color_Codes.cookato.bg,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    height: 90,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
  },

  header_img: {
    maxWidth: "60%",
    marginLeft: "auto",
    marginRight: "auto",
  },

  back_btn: {
    marginLeft: 20,
  },

  content: {
    flex: 1,
    width: "100%",
  },

  sub_con: {
    paddingVertical: 15,
    width: "90%",
    alignItems: "center",
  },

  banner: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    marginBottom: 20,
  },

  banner_img: {
    width: "80%",
    aspectRatio: 1,
  },

  banner_details: {
    width: "95%",
    padding: 10,
  },

  section: {
    width: "100%",
    marginTop: 30,
  },

  head_txt: {
    fontSize: 28,
    fontFamily: "Heading",
    color: Colors.Color_Codes.cookato.bro,
  },

  time: {
    marginTop: 10,
  },

  edit: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#e6ffe6",
  },

});
```
