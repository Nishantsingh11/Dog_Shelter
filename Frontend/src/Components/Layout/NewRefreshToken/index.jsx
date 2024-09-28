import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useDispatch } from 'react-redux'
import { newAccessToken } from "@/Store/Slice/Auth.slice"

export default function TokenRefreshPage() {
    const dispatch = useDispatch()
    
    const refreshToken = (e) => {
        e.preventDefault()
        dispatch(newAccessToken())
    }

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <h1 className="text-3xl font-bold mb-6 text-center">Token Refresh Page</h1>

            <Tabs defaultValue="refresh">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="refresh">Refresh Token</TabsTrigger>
                </TabsList>
                <TabsContent value="refresh">
                    <Card>
                        <CardHeader>
                            <CardTitle>Refresh Your Token</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-muted-foreground">
                                Click the button below to refresh your token. This process simulates a token refresh and may take a few seconds.
                            </p>
                            <Button
                                type="button" 
                                onClick={refreshToken}
                                className="w-full"
                            >
                                Refresh your token
                            </Button>

                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
