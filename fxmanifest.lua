fx_version 'cerulean'
game 'gta5'
lua54 'yes'

shared_scripts {
    '@ox_lib/init.lua',
    'shared/config.lua'
}

client_scripts {
    'client/*.lua'
}

server_scripts {
    'server/*.lua'
}

files {
    'web/dist/index.html',
    'web/dist/**/*',
    'data/*.lua',
}

ui_page 'web/dist/index.html'

dependencies {
    'ox_lib',
    'ox_inventory'
}
