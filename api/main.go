package main

import (
	"context"
	"fmt"
	"net/http"

	openai "github.com/sashabaranov/go-openai"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.GET("/report", getReport)

	router.Run("localhost:8080")
}

func getReport(ginContext *gin.Context) {
	input := ginContext.Request.URL.Query()["input"][0]
	client := openai.NewClient("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")
	resp, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: openai.GPT3Dot5Turbo,
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
