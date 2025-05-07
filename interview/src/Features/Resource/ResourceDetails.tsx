import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Card,
  Avatar,
  Text,
  Group,
  Stack,
  Title,
  Loader,
  Center,
} from '@mantine/core'
import MenuBar from '../../components/Layout/MenuBar'
import { ApiResponse } from '../../types/types'

function ResourceDetails() {
  const { id } = useParams()
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (id) {
      getUserByID(id)
    }
  }, [id])

  const getUserByID = async (_id: string) => {
    try {
      const response = await fetch('http://localhost:3000/api/users/getUserByID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ _id })
      })

      const data: ApiResponse = await response.json()
      setUserData(data.data)
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <MenuBar title="Resource Details" />

      <Center style={{padding:'5%'}}>
        {loading ? (
          <Loader />
        ) : userData ? (
          <Card shadow="md" radius="lg" withBorder maw={400} w="100%">
            <Group spacing="md" align="center">
              <Avatar size={64} radius="xl" color="blue" variant="filled">
                {userData.firstName?.[0]}
              </Avatar>
              <div>
                <Title order={4}>
                  {userData.firstName} {userData.lastName}
                </Title>
                <Text color="dimmed" size="sm">
                  {userData.designation}
                </Text>
              </div>
            </Group>

            <Stack spacing="md" mt="lg">
              <Text><strong>Username : </strong> {userData.userName}</Text>
              <Text><strong>Email:</strong> {userData.emailId}</Text>
              <Text><strong>Mobile:</strong> {userData.mobileNo}</Text>
              <Text><strong>Age:</strong> {userData.age}</Text>
              <Text><strong>Address:</strong> {userData.address}</Text>
              <Text><strong>Joined:</strong> {new Date(userData.createdAt).toLocaleDateString()}</Text>
            </Stack>
          </Card>
        ) : (
          <Text color="red">User not found.</Text>
        )}
      </Center>
    </>
  )
}

export default ResourceDetails
