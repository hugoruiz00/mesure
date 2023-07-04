import { FlatList } from "react-native";
import { View } from "react-native";
import SlideItem from "../../components/SlideItem";
import Pagination from "../../components/Pagination";
import { useRef, useState } from "react";

export const Slider = () => {
    const [index, setIndex] = useState(0);

    const slides = [
        {id:1, img:require('../../assets/img/intro-1.png')},
        {id:2, img:require('../../assets/img/intro-2.png')},
        {id:3, img:require('../../assets/img/intro-3.png')}
    ];

    const handleOnViewableItemsChanged = useRef(({viewableItems}) => {
        setIndex(viewableItems[0].index);
    }).current;

    return (
        <View style={{backgroundColor:'#fff'}}>
            <FlatList
                data={slides}
                renderItem={
                    ({item}) => <SlideItem item={item}/>
                }
                horizontal
                pagingEnabled
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={handleOnViewableItemsChanged}
            />
            <Pagination data={slides} index={index}/>
        </View>
    );
}