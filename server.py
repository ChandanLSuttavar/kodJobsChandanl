"""
This file is no longer needed as we are using localStorage for user management.
You can safely delete this file.
"""

from http.server import HTTPServer, SimpleHTTPRequestHandler
import json

class UserHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        SimpleHTTPRequestHandler.end_headers(self)

    def do_GET(self):
        # Default page
        if self.path == '/':
            self.path = '/index.html'
        return SimpleHTTPRequestHandler.do_GET(self)

    def do_POST(self):
        if self.path == '/save-user':
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            user_data = json.loads(post_data.decode())
            
            # Load current users
            try:
                with open('users.json', 'r') as f:
                    data = json.load(f)
            except:
                data = {"users": [], "nextUserId": 1}
            
            # Add new user
            user_data['id'] = data['nextUserId']
            data['users'].append(user_data)
            data['nextUserId'] += 1
            
            # Save back to file
            with open('users.json', 'w') as f:
                json.dump(data, f, indent=4)
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"success": True}).encode())
            return

        return SimpleHTTPRequestHandler.do_POST(self)

if __name__ == '__main__':
    server_address = ('', 5500)
    httpd = HTTPServer(server_address, UserHandler)
    print('Starting server on port 5500...')
    print('Open http://localhost:5500 in your browser')
    httpd.serve_forever()
