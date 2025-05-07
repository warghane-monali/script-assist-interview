  import { useEffect, useState } from 'react'
  // import '../../../styles/abstracts/_colours.scss'
  import { Button, Pagination, Table, TextInput } from '@mantine/core'
  import MenuBar from '../../components/Layout/MenuBar'
  import { usePagination } from '@mantine/hooks'
  import { ApiResponse, User } from '../../types/types'
import { useNavigate } from 'react-router-dom'

  function ResourceList() {
    const navigate = useNavigate()
    const [resourceData, setResourceData] = useState<User[]>([])
    const [search, setSearch] = useState<string>('') // fixed typo from "searach"
    const documentsPerPage = 10
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)

    useEffect(() => {
      fetchAllUsers()
    }, [search, documentsPerPage, page])

    const fetchAllUsers = async () => {
      try {
        const payload = {
          searchTitle: search,
          documentsPerPage: documentsPerPage,
          page: page
        }

        const response = await fetch('http://localhost:3000/api/users/getAllUsers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        })

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }

        const data: ApiResponse = await response.json()
        setResourceData(data?.data)
        setTotalPages(data?.noOfPages)
      } catch (error) {
        console.error('Failed to fetch users:', error)
      }
    }
    
    const handleViewUser = (id: string) => {

      navigate(`/dashboard/resource/${id}`)

    }

    return (
      <>
        <MenuBar title="Resource List" />

        <div style={{ padding: '20px' }}>
          <div style={{ marginTop: '10px', marginBottom: '20px' }}>
            <TextInput
              label="Search"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
              labelProps={{ style: { color: 'black' } }}
              style={{ width: '300px' }}
            />
          </div>

          <Table withBorder withColumnBorders highlightOnHover>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Name</th>
                <th>Mobile No.</th>
                <th>Email ID</th>
                <th>Age</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {resourceData?.length > 0 ? (
                resourceData?.map((item, index) => (
                  <tr key={index}>
                    <td>{(page - 1) * documentsPerPage + index + 1}</td>
                    <td>{item.firstName} {item.lastName}</td>
                    <td>{item.mobileNo}</td>
                    <td>{item.emailId}</td>
                    <td>{item.age}</td>
                    <td><Button className="login-btn"  onClick={() => handleViewUser(item._id)}>View</Button></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center' }}>
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          <div   style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: 'white',
            padding: '8px',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)', 
            zIndex: 1000 
          }}>
            <Pagination value={page} onChange={setPage} total={totalPages} />
          </div>
        </div>
      </>
    )
  }

  export default ResourceList
