package main

import (
	"log"
	"net"
	"user-service/config"
	"user-service/controllers"
	"user-service/proto"

	"google.golang.org/grpc"
)

func main() {
	config.InitDB()

	lis, err := net.Listen("tcp", ":8002")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	proto.RegisterUserServiceServer(s, &controllers.UserServiceServer{})
	log.Printf("Server listening at %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
