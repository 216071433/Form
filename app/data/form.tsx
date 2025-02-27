import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, TextInput, Text, Button, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { CheckBox  } from 'react-native-elements'; // For checkboxes
import DateTimePicker , {DateTimePickerAndroid}from '@react-native-community/datetimepicker';

const FeedbackForm = () => {
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

  const handleSubmit = () => {
    if (!fullName || !contact) {
      Alert.alert('Error', 'Full Name and Contact are required!');
      return;
    }

    const formData = {
      fullName,
      contact,
      email,
      feedbackType,
      description,
      incidentDetails,
      routeShiftDuty,
      driversName,
      dateOfIncident,
      timeOfIncident,
      locationOfIncident,
      followUp,
      confirmation,
    };

    console.log(formData);
    Alert.alert('Success', 'Form submitted successfully!');
  };

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <SafeAreaView className='py-3 pb-6'>

    <ScrollView className="p-4 bg-white">
      <Text className="text-xl font-bold mb-4">Feedback Form</Text>

      <Text className="text-sm font-semibold mb-2">Full Name</Text>
      <TextInput
        value={fullName}
        onChangeText={setFullName}
        placeholder="Enter your full name"
        className="border p-2 mb-4 rounded"
      />

      <Text className="text-sm font-semibold mb-2">Contact</Text>
      <TextInput
        value={contact}
        onChangeText={setContact}
        placeholder="Enter your contact number"
        keyboardType="phone-pad"
        className="border p-2 mb-4 rounded"
      />

      <Text className="text-sm font-semibold mb-2">Email Address (Optional)</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email address"
        keyboardType="email-address"
        className="border p-2 mb-4 rounded"
      />

      <Text className="text-sm font-semibold mb-2">Type of Feedback</Text>
      <View className="flex-row mb-4">
        <CheckBox
          title="Complaint"
          checked={feedbackType === 'complaint'}
          onPress={() => setFeedbackType(feedbackType === 'complaint' ? '' : 'complaint')}
        />
        <CheckBox
          title="Suggestion"
          checked={feedbackType === 'suggestion'}
          onPress={() => setFeedbackType(feedbackType === 'suggestion' ? '' : 'suggestion')}
        />
      </View>

      <Text className="text-sm font-semibold mb-2">Please describe your concern or suggestion in detail</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Provide more details"
        multiline
        className="border p-2 h-24 mb-4 rounded"
      />

      <Text className="text-sm font-semibold mb-2">Incident Details (If applicable)</Text>
      <TextInput
        value={incidentDetails}
        onChangeText={setIncidentDetails}
        placeholder="Provide incident details"
        className="border p-2 mb-4 rounded"
      />

      <Text className="text-sm font-semibold mb-2">Route / Shift / Duty</Text>
      <TextInput
        value={routeShiftDuty}
        onChangeText={setRouteShiftDuty}
        placeholder="Enter route, shift, or duty"
        className="border p-2 mb-4 rounded"
      />

      <Text className="text-sm font-semibold mb-2">Driver's Name</Text>
      <TextInput
        value={driversName}
        onChangeText={setDriversName}
        placeholder="Enter driver's name"
        className="border p-2 mb-4 rounded"
      />

      <Text className="text-sm font-semibold mb-2">Date of Incident</Text>

      <TextInput
        value={date.toDateString()}
        onChangeText={setDateOfIncident}
        placeholder="Enter date of incident (YYYY-MM-DD)"
        className="border p-2 mb-4 rounded"
      />
      <Button onPress={showDatepicker} title="Show date picker!" />

      <Text className="text-sm font-semibold mb-2">Time of Incident</Text>
      <TextInput
        value={timeOfIncident}
        onChangeText={setTimeOfIncident}
        placeholder="Enter time of incident (HH:MM)"
        className="border p-2 mb-4 rounded"
      />
      <Button onPress={showTimepicker} title="Show time picker!" />

      <Text className="text-sm font-semibold mb-2">Location of Incident</Text>
      <TextInput
        value={locationOfIncident}
        onChangeText={setLocationOfIncident}
        placeholder="Enter location of incident"
        className="border p-2 mb-4 rounded"
      />

      <Text className="text-sm font-semibold mb-2">Would you like us to follow up with you regarding this feedback?</Text>
      <View className="flex-row mb-4">
        <CheckBox
          title="YES"
          checked={followUp}
          onPress={() => setFollowUp(!followUp)}
          
        />
        <CheckBox
          title="NO"
          checked={!followUp}
          onPress={() => setFollowUp(!followUp)}
        />
      </View>

      <Text className="text-sm font-semibold mb-2">Final confirmation</Text>
      <View className="mb-4">
        <CheckBox
          title="I confirm that the information provided is accurate to the best of my knowledge"
          checked={confirmation}
          onPress={() => setConfirmation(!confirmation)}
        />
      </View>

        <TouchableOpacity
            className='p-3 mb-6 bg-blue-500 items-center'
            onPress={handleSubmit}
        >
            <Text className='text-white'>Submit</Text>
        </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
  );
};

export default FeedbackForm;
