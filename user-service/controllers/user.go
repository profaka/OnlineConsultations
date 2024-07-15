package controllers

import (
	"context"
	"user-service/models"
	"user-service/proto"

	"gorm.io/gorm"
)

type UserServiceServer struct {
	proto.UnimplementedUserServiceServer
	DB *gorm.DB
}

func (s *UserServiceServer) CreateUser(ctx context.Context, req *proto.CreateUserRequest) (*proto.CreateUserResponse, error) {
	user := models.User{
		Name:     req.Name,
		Email:    req.Email,
		Password: req.Password,
		Role:     req.Role,
	}

	if err := s.DB.Create(&user).Error; err != nil {
		return &proto.CreateUserResponse{
			Message: err.Error(),
			Success: false,
		}, err
	}

	return &proto.CreateUserResponse{
		Message: "User created successfully",
		Success: true,
	}, nil
}

func (s *UserServiceServer) GetUser(ctx context.Context, req *proto.GetUserRequest) (*proto.GetUserResponse, error) {
	var user models.User
	if err := s.DB.First(&user, req.Id).Error; err != nil {
		return nil, err
	}

	return &proto.GetUserResponse{
		Id:    uint32(user.ID),
		Name:  user.Name,
		Email: user.Email,
		Role:  user.Role,
	}, nil
}
