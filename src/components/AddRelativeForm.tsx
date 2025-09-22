import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mars, Transgender, Venus } from 'lucide-react-native';
import { AddPatientPayload } from '../types/Patient';

const schema = z.object({
  fname: z.string().min(1, 'Required'),
  lname: z.string().min(1, 'Required'),
  age: z.string().min(1, 'Required'),
  agetype: z.enum(['Years', 'Months', 'Days']),
  countrycode: z.string().min(1, 'Required'),
  mobileno: z.string().min(7, 'Invalid number'),
  email: z.string().email().optional(),
  gender: z.enum(['Male', 'Female', 'Other']),
  relationid: z.string().min(1, 'Required'),
  address: z.string().optional(),
  districtid: z.string().min(1, 'Required'),
  vdcid: z.string().min(1, 'Required'),
  wardno: z.string().min(1, 'Required'),
  addtorelative: z.enum(['Y', 'N']),
  userid: z.string(),
  orgid: z.string(),
  tole: z.string().min(1, 'Required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: AddPatientPayload) => void;
}

const AddRelativeForm: React.FC<Props> = ({ onSubmit }) => {
  const { control, handleSubmit, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fname: 'John',
      lname: 'Doe',
      age: '25',
      agetype: 'Years',
      countrycode: '+977',
      mobileno: '9812345678',
      email: 'john.doe@example.com',
      gender: 'Male',
      relationid: 'Other',
      districtid: 'Achham',
      vdcid: '1',
      wardno: '1',
      addtorelative: 'Y',
      userid: '414141',
      orgid: '614',
      tole: 'Central Park',
    },
  });

  const [relationOpen, setRelationOpen] = useState(false);
  const [relationItems, setRelationItems] = useState([
    { label: 'Father', value: 'Father' },
    { label: 'Mother', value: 'Mother' },
    { label: 'Brother', value: 'Brother' },
    { label: 'Sister', value: 'Sister' },
    { label: 'Spouse', value: 'Spouse' },
    { label: 'Other', value: 'Other' },
  ]);

  const [ageTypeOpen, setAgeTypeOpen] = useState(false);
  const [ageTypeItems, setAgeTypeItems] = useState([
    { label: 'Years', value: 'Years' },
    { label: 'Months', value: 'Months' },
    { label: 'Days', value: 'Days' },
  ]);

  const gender = watch('gender');

  return (
    <View className="flex-1 p-4">
      {/* First + Last Name */}
      <View className="flex-row gap-x-3 mb-4">
        <View className="flex-1">
          <Text className="mb-1 text-gray-600">First Name</Text>
          <Controller
            control={control}
            name="fname"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextInput
                  className="border rounded-md p-3"
                  placeholder="Enter first name"
                  value={value}
                  onChangeText={onChange}
                />
                {error && (
                  <Text className="text-red-500 mt-1">{error.message}</Text>
                )}
              </>
            )}
          />
        </View>
        <View className="flex-1">
          <Text className="mb-1 text-gray-600">Last Name</Text>
          <Controller
            control={control}
            name="lname"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextInput
                  className="border rounded-md p-3"
                  placeholder="Enter last name"
                  value={value}
                  onChangeText={onChange}
                />
                {error && (
                  <Text className="text-red-500 mt-1">{error.message}</Text>
                )}
              </>
            )}
          />
        </View>
      </View>

      {/* Gender */}
      <Text className="mb-2 text-gray-600 font-semibold">Gender</Text>
      <View className="flex-row gap-x-3 mb-4">
        {['Male', 'Female', 'Other'].map(g => (
          <TouchableOpacity
            key={g}
            onPress={() => setValue('gender', g as FormData['gender'])}
            className={`flex-1 flex-row items-center justify-center border rounded-2xl py-3 ${
              gender === g ? 'bg-blue-100 border-blue-500' : 'border-gray-300'
            }`}
          >
            {g === 'Male' && <Mars size={18} />}
            {g === 'Female' && <Venus size={18} />}
            {g === 'Other' && <Transgender size={18} />}
            <Text className="ml-2">{g}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Age + Type */}
      <View className="flex-row gap-3 mb-4">
        <View className="flex-1">
          <Text className="mb-1 text-gray-600">Age</Text>
          <Controller
            control={control}
            name="age"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextInput
                  className="border rounded-xl p-3 h-14"
                  keyboardType="numeric"
                  placeholder="Enter age"
                  value={value}
                  onChangeText={onChange}
                />
                {error && (
                  <Text className="text-red-500 text-xs mt-1">
                    {error.message}
                  </Text>
                )}
              </>
            )}
          />
        </View>

        <View className="w-36">
          <Text className="mb-1 text-gray-600">Type</Text>
          <Controller
            control={control}
            name="agetype"
            render={({ field: { onChange, value } }) => (
              <DropDownPicker
                open={ageTypeOpen}
                value={value}
                items={ageTypeItems}
                setOpen={setAgeTypeOpen}
                setValue={callback => {
                  const newValue =
                    typeof callback === 'function' ? callback(value) : callback;
                  onChange(newValue);
                }}
                setItems={setAgeTypeItems}
                placeholder="Select"
                dropDownContainerStyle={{ borderColor: '#d1d5db' }}
                labelStyle={{ color: '#374151' }} // <Text> safe
                textStyle={{ fontSize: 14 }}
              />
            )}
          />
        </View>
      </View>

      {/* Email */}
      <Text className="mb-1 text-gray-600">Email Address</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="border rounded-md p-3 mb-4"
            placeholder="Enter email"
            keyboardType="email-address"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      {/* Phone */}
      <Text className="mb-1 text-gray-600">Phone Number</Text>
      <View className="flex-row items-center mb-4 border-b">
        <Text className="p-3 text-gray-600">{watch('countrycode')}</Text>
        <Controller
          control={control}
          name="mobileno"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <View className="flex-1">
              <TextInput
                className="p-3 text-base"
                placeholder="Enter phone number"
                keyboardType="phone-pad"
                value={value}
                onChangeText={onChange}
              />
              {error && (
                <Text className="text-red-500 text-xs mb-1">
                  {error.message}
                </Text>
              )}
            </View>
          )}
        />
      </View>

      {/* Relationship */}
      <Text className="mb-1 text-gray-600">Relationship</Text>
      <Controller
        control={control}
        name="relationid"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <DropDownPicker
              open={relationOpen}
              value={value}
              items={relationItems}
              setOpen={setRelationOpen}
              setValue={callback => {
                const newValue =
                  typeof callback === 'function' ? callback(value) : callback;
                onChange(newValue);
              }}
              setItems={setRelationItems}
              dropDownContainerStyle={{ borderColor: '#D1D5DB' }}
              labelStyle={{ color: '#374151' }}
              placeholder="Select relationship"
            />
            {error && (
              <Text className="text-red-500 text-xs mt-1">{error.message}</Text>
            )}
          </>
        )}
      />

      {/* District + VDC */}
      <View className="flex-row gap-x-3 mb-4">
        <View className="flex-1">
          <Text className="mb-1 text-gray-600">Select District</Text>
          <Controller
            control={control}
            name="districtid"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextInput
                  className="border rounded-md p-3"
                  placeholder="Select District"
                  value={value}
                  onChangeText={onChange}
                />
                {error && (
                  <Text className="text-red-500 mt-1">{error.message}</Text>
                )}
              </>
            )}
          />
        </View>
        <View className="flex-1">
          <Text className="mb-1 text-gray-600">Select VDC/Municipality</Text>
          <Controller
            control={control}
            name="vdcid"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextInput
                  className="border rounded-md p-3"
                  placeholder="Select VDC/Municipality"
                  value={value}
                  onChangeText={onChange}
                />
                {error && (
                  <Text className="text-red-500 mt-1">{error.message}</Text>
                )}
              </>
            )}
          />
        </View>
      </View>

      {/* Ward + Tole */}
      <View className="flex-row gap-x-3 mb-4">
        <View className="flex-1">
          <Text className="mb-1 text-gray-600">Ward No</Text>
          <Controller
            control={control}
            name="wardno"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextInput
                  className="border rounded-md p-3"
                  placeholder="Ward"
                  value={value}
                  onChangeText={onChange}
                />
                {error && (
                  <Text className="text-red-500 mt-1">{error.message}</Text>
                )}
              </>
            )}
          />
        </View>
        <View className="flex-1">
          <Text className="mb-1 text-gray-600">Tole</Text>
          <Controller
            control={control}
            name="tole"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextInput
                  className="border rounded-md p-3"
                  placeholder="Tole"
                  value={value}
                  onChangeText={onChange}
                />
                {error && (
                  <Text className="text-red-500 mt-1">{error.message}</Text>
                )}
              </>
            )}
          />
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        className="bg-green-600 p-4 rounded-2xl mt-2"
      >
        <Text className="text-center text-white font-semibold text-lg">
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddRelativeForm;
