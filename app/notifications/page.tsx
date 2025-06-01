import PushNotifications from '../components/PushNotifications'

export default function NotificationsPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Notifications Push</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <PushNotifications />
      </div>
    </div>
  )
} 