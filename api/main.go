package main

import (
	"context"
	"fmt"
	"net/http"

	openai "github.com/sashabaranov/go-openai"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowWildcard = true
	router.Use(cors.New(config))
	router.GET("/report/gpt4", getReportGpt4)
	router.GET("/report", getReport)
	router.Run(":8080")
}

func getReportGpt4(ginContext *gin.Context) {
	input := ginContext.Request.URL.Query()["input"][0]
	client := openai.NewClient("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")
	resp, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: openai.GPT4,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleUser,
					Content: input,
				},
			},
		},
	)

	if err != nil {
		fmt.Printf("ChatCompletion error: %v\n", err)
		return
	}
	var report string = resp.Choices[0].Message.Content
	ginContext.IndentedJSON(http.StatusOK, report)
}

func getReport(ginContext *gin.Context) {
	input := ginContext.Request.URL.Query()["input"][0]
	client := openai.NewClient("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")
	resp, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: openai.GPT3Dot5Turbo0301,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleUser,
					Content: input,
				},
			},
		},
	)

	if err != nil {
		fmt.Printf("ChatCompletion error: %v\n", err)
		return
	}
	var report string = resp.Choices[0].Message.Content
	ginContext.IndentedJSON(http.StatusOK, report)
}
