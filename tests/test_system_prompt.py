from approaches.promptmanager import PromptyManager

def test_system_prompt_content():
    prompt_manager = PromptyManager()
    prompt = prompt_manager.load_prompt("chat_answer_question.prompty")
    
    # Check if the prompt object has the 'system' content or template
    # Prompty objects usually have a 'template' or similar attribute, or we can render it.
    # However, prompty.load returns a Prompty object. 
    # Let's try to inspect the system message part of the template.
    
    # Since I don't know the exact internal structure of the Prompty object returned by prompty.load,
    # I will try to render it with some dummy data and check the output messages.
    
    messages = prompt_manager.render_prompt(prompt, {
        "citations": [],
        "user_query": "test",
        "past_messages": []
    })
    
    system_message = next((m for m in messages if m["role"] == "system"), None)
    assert system_message is not None
    
    content = system_message["content"]
    assert "NYC Benefits Navigator" in content or "NYC" in content
    assert "Assistant helps NYC residents" in content
    assert "health benefits" in content
