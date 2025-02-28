import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, TextInput, Text, Button, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { CheckBox  } from 'react-native-elements'; // For checkboxes
import DateTimePicker , {DateTimePickerAndroid}from '@react-native-community/datetimepicker';
import Fontisto from '@expo/vector-icons/Fontisto';
import { Controller, useForm } from 'react-hook-form';
import { RelativePathString, router } from 'expo-router';

export interface FormData {
  fullName: string;
  contact: string;
  email: string;
  feedbackType: string;
  description: string;
  routeShiftDuty: string;
  busNumber: string;
  driversName: string;
  dateOfIncident: string;  // String format (YYYY-MM-DD or formatted)
  timeOfIncident: string;  // HH:MM formatted string
  locationOfIncident: string;
  followUp: string;
  confirmation: string;
}

const FeedbackForm = () => {
  const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
        fullName: '',
        contact: '',
        email: '',
        feedbackType: '',
        description: '',
        routeShiftDuty: '',
        busNumber: '',
        driversName: '',
        dateOfIncident: '',
        timeOfIncident: '',
        locationOfIncident: '',
        followUp: '',
        confirmation: ''
    }
});
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [description, setDescription] = useState('');
  const [incidentDetails, setIncidentDetails] = useState('');
  const [routeShiftDuty, setRouteShiftDuty] = useState('');
  const [driversName, setDriversName] = useState('');
  const [dateOfIncident, setDateOfIncident] = useState('');
  const [timeOfIncident, setTimeOfIncident] = useState('');
  const [locationOfIncident, setLocationOfIncident] = useState('');
  const [followUp, setFollowUp] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  


  const [date, setDate] = useState(new Date(new Date().toDateString()));
  const [time, setTime] = useState(new Date(new Date().toDateString()))
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onDateChange = (event: any, selectedDate: any) => {
    if (selectedDate) {
        const formattedDate = selectedDate.toDateString(); // Format date
        setValue("dateOfIncident", formattedDate); // Update the form field
    }
};

const onTimeChange = (event: any, selectedTime: any) => {
    if (selectedTime) {
        const formattedTime = selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }); // Format time
        setValue("timeOfIncident", formattedTime); // Update the form field
    }
};

const showMode = (currentMode: any) => {
    if(currentMode === 'date') {
        DateTimePickerAndroid.open({
          value: date,
          onChange: onDateChange,
          mode: currentMode,
          is24Hour: true,
        });
    } else if(currentMode === 'time') {
        DateTimePickerAndroid.open({
          value: time,
          onChange: onTimeChange,
          mode: currentMode,
          is24Hour: true,
        });
    }
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
    Alert.alert('Success', 'Form submitted successfully!');
    router.replace({
      pathname: '/data/confirmation' as RelativePathString,
      params: {data: JSON.stringify(data)}
    })
  }

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  console.log({errors})

  return (
    <SafeAreaView className='w-full h-full'>
    <ScrollView className="py-5 p-4 bg-white">
      <Text className="text-xl font-bold mb-4">Feedback Form</Text>

      <Text className="text-sm font-semibold mb-2">Full Name</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="Enter your full name"
            className="border p-2 mb-4 rounded"
          />
        )}
        name="fullName"
        rules={{ required: true}}
      />
      {errors.fullName && <Text className="text-red-500">Name is required</Text>}

      <Text className="text-sm font-semibold mb-2">Contact</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="Enter your contact number"
            keyboardType="phone-pad"
            className="border p-2 mb-4 rounded"
          />
        )}
        name="contact"
        rules={{ required: true}}
      />
      {errors.contact && <Text className="text-red-500">Contact is required</Text>}

      <Text className="text-sm font-semibold mb-2">Email Address (Optional)</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="Enter your email address"
            keyboardType="email-address"
            className="border p-2 mb-4 rounded"
          />
        )}
        name="email"
        rules={{ required: true}}
      />
      {errors.email && <Text className="text-red-500">Email is required</Text>}

      <Text className="text-sm font-semibold mb-2">Type of Feedback</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View className="flex-row mb-4">
            <CheckBox
              title="Complaint"
              checked={value === 'complaint'}
              onPress={() => onChange(value === 'complaint' ? '' : 'complaint')}
            />
            <CheckBox
              title="Suggestion"
              checked={value === 'suggestion'}
              onPress={() => onChange(value === 'suggestion' ? '' : 'suggestion')}
            />
          </View>
        )}
        name="feedbackType"
        rules={{ required: true}}
      />
      {errors.feedbackType && <Text className="text-red-500">Feedback type is required</Text>}

      <Text className="text-sm font-semibold mb-2">Please describe your concern or suggestion in detail</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="Provide more details"
            multiline
            numberOfLines={10}
            style={{ 
                height: 100,
                textAlignVertical: 'top'
            }}
            className="border p-2 h-24 mb-4 rounded"
          />
        )}
        name="description"
        rules={{ required: true}}
      />
      {errors.description && <Text className="text-red-500">Description is required</Text>}

      <Text className="text-sm font-semibold mb-2">Incident Details (If applicable)</Text>

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="Bus number"
            className="border p-2 mb-4 rounded"
          />
        )}
        name="busNumber"
        rules={{ required: false}}
      />

      <Text className="text-sm font-semibold mb-2">Route / Shift / Duty</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="Enter route, shift, or duty"
            className="border p-2 mb-4 rounded"
          />
        )}
        name="routeShiftDuty"
        rules={{ required: false}}
      />

      <Text className="text-sm font-semibold mb-2">Driver's Name</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="Enter driver's name"
            className="border p-2 mb-4 rounded"
          />
        )}
        name="driversName"
        rules={{ required: false}}
      />

      <View className='w-full'>
        <Text className="text-sm font-semibold mb-2">Date of Incident</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className='w-full flex-row items-center mb-2 gap-2'>
              <TouchableOpacity className='p-2 bg-blue-200 rounded' onPress={showDatepicker}>
                <Fontisto name="date" size={24} color="black" />
              </TouchableOpacity>
              <TextInput
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder="YYYY-MM-DD"
                className="border p-2 rounded items-center w-[80%]"
              />
            </View>
          )}
          name="dateOfIncident"
          rules={{ required: false}}
        />
      </View>

        <View className='w-full'>
          <Text className="text-sm font-semibold mb-2">Time of Incident</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View className='w-full flex-row items-center mb-2 gap-2'>
                <TouchableOpacity className='p-2 bg-blue-200 rounded' onPress={showTimepicker}>
                  <Fontisto name="clock" size={24} color="black" />
                </TouchableOpacity>
                <TextInput
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  placeholder="20:00"
                  className="border p-2 rounded items-center w-[80%]"
                />
              </View>
            )}
            name="timeOfIncident"
            rules={{ required: false}}
          />
      </View>

      

      <Text className="text-sm font-semibold mb-2">Location of Incident</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="Enter location of incident"
            className="border p-2 mb-4 rounded"
          />
        )}
        name="locationOfIncident"
        rules={{ required: false}}
      />

      <Text className="text-sm font-semibold mb-2">Would you like us to follow up with you regarding this feedback?</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View className="flex-row mb-4">
            <CheckBox
              title="YES"
              checked={value === 'yes'}
              onPress={() => onChange(value === 'yes' ? '' : 'yes')}
            />
            <CheckBox
              title="NO"
              checked={value === 'no'}
              onPress={() => onChange(value === 'no' ? '' : 'no')}
            />
          </View>
        )}
        name="followUp"
        rules={{ required: true}}
      />
      {errors.followUp && <Text className="text-red-500">Follow up is required</Text>}

      <Text className="text-sm font-semibold mb-2">Final confirmation</Text>
      <View className="mb-4">
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CheckBox
              title="I confirm that the information provided is accurate to the best of my knowledge"
              checked={!!value}
              onPress={() => onChange(!value)}
            />
          )}
          name="confirmation"
          rules={{ required: true}}
        />
        {errors.confirmation && <Text className="text-red-500">Confirmation is required</Text>}
      </View>

        <TouchableOpacity
            className='p-3 mb-6 bg-blue-500 items-center'
            onPress={handleSubmit(onSubmit)}
        >
            <Text className='text-white'>Submit</Text>
        </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
  );
};

export default FeedbackForm;
