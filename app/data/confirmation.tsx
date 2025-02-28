import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const Confirmation = () => {
    const {data} = useLocalSearchParams()
    const parsedData = Array.isArray(data) ? data.map(item => JSON.parse(item)) : JSON.parse(data)
    console.log(parsedData)
    return (
        <SafeAreaView className='w-full h-full flex items-center p-5'>
            <View className='w-full h-full flex flex-col items-center'>
                <Text className='text-2xl font-bold'>Thank you for your feedback</Text>
                <Text className='text-xl'>Complaint details</Text>
                <Text className='text-lg'>Full Name: {parsedData.fullName}</Text>
                <Text className='text-lg'>Contact Number: {parsedData.contactNumber}</Text>
                <Text className='text-lg'>Email: {parsedData.email}</Text>
                <Text className='text-lg'>Incident Description: {parsedData.description}</Text>
                <Text className='text-lg'>Type of Feedback: {parsedData.feedbackType}</Text>
                <Text className='text-lg'>Bus Number: {parsedData.busNumber}</Text>
                <Text className='text-lg'>Route: {parsedData.route}</Text>
                <Text className='text-lg'>Driver Name: {parsedData.driversName}</Text>
                <Text className='text-lg'>Date of Incident: {parsedData.dateOfIncident}</Text>
                <Text className='text-lg'>Time of Incident: {parsedData.timeOfIncident}</Text>
                <Text className='text-lg'>Location of Incident: {parsedData.locationOfIncident}</Text>
                <Text className='text-lg'>Follow Up Request: {parsedData.followUp}</Text>
            </View>
        </SafeAreaView>
    )
}

export default Confirmation